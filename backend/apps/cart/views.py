from django.shortcuts import render
from .models import Cart, CartItem
from apps.product.models import ProductImage
from .serializers import CartSerializer, CartItemSerializer
from apps.user.serializers import UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from django.db.models import Prefetch, OuterRef, Subquery

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]

    def get_queryset(self):

        return (
            Cart.objects
            .filter(user=self.request.user)
            .prefetch_related(
                Prefetch(
                    'items',
                    queryset=CartItem.objects
                        .select_related('product')
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
        return (
            CartItem.objects
            .filter(cart__user=self.request.user)
            .select_related('product', 'cart')

        )

        
    def create(self, request, *args, **kwargs):
        product_id = request.data.get("product")
        cart, created = Cart.objects.get_or_create(user=request.user)
        if CartItem.objects.filter(cart=cart, product_id=product_id).exists():
            return Response(
                {"detail": "Item already in your cart."},
                status=status.HTTP_409_CONFLICT
            )

        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)

    def perform_destroy(self, instance):
        cart = instance.cart
        instance.delete()
        if not cart.items.exists():
            cart.delete()