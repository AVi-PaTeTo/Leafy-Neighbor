from rest_framework import serializers
from .models import Cart, CartItem
from apps.product.serializers import ProductSerializer

from django.contrib.auth import get_user_model


User = get_user_model()

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.title')
    product_image = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_name', 'price', 'quantity', 'product_image', 'added_on']
        read_only_fields = ['id', 'cart', 'price', 'added_on', 'product_image']

    def get_product_image(self, obj):
        first_image = getattr(obj, 'first_image', None)
        if first_image:
            request = self.context.get('request')
            return request.build_absolute_uri(f"/media/{first_image}")
        return None

    
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        
        model = Cart
        fields = ['id', 'user', 'items', 'total', 'last_updated']
        read_only_fields = ['id', 'user', 'items', 'total', 'last_updated']

