from django.shortcuts import render
from django.db import transaction
from django.db.models import Subquery, OuterRef, Prefetch
from apps.product.models import ProductImage
from .models import Order,OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from apps.address.models import Address
from apps.cart.models import Cart
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser


def address_format(address):
    return(f"{address.name}\n"
           f"{address.phone}\n"
           f"{address.house}, {address.street}\n"
           f"{address.city} - {address.pincode}\n"
           f"{address.state}\n")


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user

        first_image_qs = ProductImage.objects.filter(
            product=OuterRef('product_id')
        ).order_by('id').values('image')[:1]

        # if user.is_staff:
        #     return(
        #     Order.objects.all()
        #     .prefetch_related(
        #         Prefetch(
        #             'order_items',
        #             queryset=OrderItem.objects
        #                 .select_related('product')
        #                 .annotate(first_image=Subquery(first_image_qs))
        #                 .order_by('-unit_price','-quantity')
        #         )
        #     )
        # )
        return (
            Order.objects
            .filter(user=user)
            .prefetch_related(
                Prefetch(
                    'order_items',
                    queryset=OrderItem.objects
                        .select_related('product')
                        .annotate(first_image=Subquery(first_image_qs))
                        .order_by('-unit_price','-quantity')
                )
            )
        )


    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            raise ValidationError({"cart": "No cart found for this user."})

        try:
            default_address = address_format(Address.objects.get(user=user, is_default=True))
        except Address.DoesNotExist:
            raise ValidationError({"address": "No default address found. Please add one before ordering."})

        with transaction.atomic():
            order = serializer.save(
                user=user,
                total=0,
                shipping_address=default_address,
                status="PENDING"
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    product_name=item.product.title,
                    quantity=item.quantity,
                    unit_price=item.price
                )

            order.total = cart.total
            order.save()
            cart.items.all().delete()

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = OrderItem.objects.all()
        
        first_image_qs = ProductImage.objects.filter(
            product=OuterRef('product_id')
        ).order_by('id').values('image')[:1]

        order_id = self.request.query_params.get('order_id')
        if order_id is not None:
            queryset = (queryset.filter(order_id=order_id)
                                .select_related('product','order')
                                .annotate(first_image=Subquery(first_image_qs)))
        return queryset