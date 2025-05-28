from rest_framework import serializers
from .models import Wishlist, WishlistItem
from apps.product.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()

class WishlistItemSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(source='product.title')
    product_price = serializers.ReadOnlyField(source='product.price')
    
    class Meta:
        model = WishlistItem
        fields = ['id', 'wishlist', 'product', 'product_title', 'product_price', 'added_at']
        read_only_fields = ['added_at']


class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'name', 'created_at', 'items']