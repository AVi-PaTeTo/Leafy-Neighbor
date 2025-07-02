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

    def validate_wishlist(self, value):
        request = self.context.get('request')
        if request.user != value.user:
            raise serializers.ValidationError("You can only add items to your own wishlist.")
        return value
    
class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'name', 'created_at', 'items']


    