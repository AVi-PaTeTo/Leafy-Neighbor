from rest_framework import serializers
from .models import Cart, CartItem
from apps.product.serializers import ProductSerializer

from django.contrib.auth import get_user_model


User = get_user_model()

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.title')
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_name', 'price', 'quantity', 'added_on']
        read_only_fields = ['id', 'cart', 'price', 'added_on']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total', 'last_updated']
        read_only_fields = ['id', 'user', 'items', 'total', 'last_updated']

