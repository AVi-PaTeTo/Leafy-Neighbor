from rest_framework import serializers
from .models import Order, OrderItem
from django.contrib.auth import get_user_model


User = get_user_model()


class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total', 'status', 'created_at', 'updated_at', 'shipping_address', 'billing_address']


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity', 'unit_price']