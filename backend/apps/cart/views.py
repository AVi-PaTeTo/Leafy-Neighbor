from django.shortcuts import render
from .models import Cart, CartItem
from apps.product.models import ProductImage
from .serializers import CartSerializer, CartItemSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from django.db.models import Prefetch, OuterRef, Subquery

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]

    def get_queryset(self):
        first_image_qs = ProductImage.objects.filter(
            product=OuterRef('product_id')
        ).order_by('id').values('image')[:1]

        return (
            Cart.objects
            .filter(user=self.request.user)
            .prefetch_related(
                Prefetch(
                    'items',
                    queryset=CartItem.objects
                        .select_related('product')
                        .annotate(first_image=Subquery(first_image_qs))
                        .order_by('added_on')
                )
            )
        )

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering_fields = ['added_on']
    ordering = ["added_on"]

    def get_queryset(self):
        first_image_qs = ProductImage.objects.filter(
            product=OuterRef('product_id')
        ).order_by('id').values('image')[:1]

        return (
            CartItem.objects
            .filter(cart__user=self.request.user)
            .select_related('product', 'cart')
            .annotate(first_image=Subquery(first_image_qs))
        )
    
    def perform_create(self, serializer):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)

    def perform_destroy(self, instance):
        cart = instance.cart
        instance.delete()
        if not cart.items.exists():
            cart.delete()