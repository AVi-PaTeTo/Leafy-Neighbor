from rest_framework import serializers
from .models import Order, OrderItem
from django.contrib.auth import get_user_model


User = get_user_model()





class OrderItemSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_name','product_image', 'quantity', 'unit_price']
        read_only_fields = ['id']

    def get_product_image(self, obj):
        if obj.first_image:
            request = self.context.get('request')
            return request.build_absolute_uri(f"/media/{obj.first_image}")
        return None

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'status', 'created_at', 'updated_at', 'shipping_address', 'order_items']
        read_only_fields = ['id', 'user', 'total', 'created_at', 'updated_at',  'shipping_address', 'order_items']