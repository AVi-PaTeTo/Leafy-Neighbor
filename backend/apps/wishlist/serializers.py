from rest_framework import serializers
from .models import Wishlist, WishlistItem
from apps.product.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()

class WishlistItemSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(source='product.title')
    product_price = serializers.ReadOnlyField(source='product.price')
    user = serializers.ReadOnlyField(source='wishlist.user.id')
    product_image = serializers.SerializerMethodField(allow_null=True, required=False)

    class Meta:
        model = WishlistItem
        fields = ['id', 'user', 'wishlist', 'product', 'product_title', 'product_price','product_image', 'added_at']
        read_only_fields = ['user', 'added_at', 'product_image',]

    def validate_wishlist(self, value):
        request = self.context.get('request')
        if request.user != value.user:
            raise serializers.ValidationError("You can only add items to your own wishlist.")
        return value
    
    def get_product_image(self, obj):
        if obj.first_image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.first_image.url if hasattr(obj.first_image, 'url') else f"/media/{obj.first_image}")
        return None

class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id','user', 'name', 'created_at', 'items']
        read_only_fields = ['user']

    