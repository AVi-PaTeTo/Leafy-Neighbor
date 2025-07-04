from rest_framework import serializers
from .models import Payment
from django.contrib.auth import get_user_model


User = get_user_model()

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ['id', 'order', 'razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature', 'status', 'amount', 'created_at']
        read_only_fields = ['id','order', 'razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature', 'status', 'amount', 'created_at']

        