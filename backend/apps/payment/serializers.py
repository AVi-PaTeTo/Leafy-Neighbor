from rest_framework import serializers
from .models import Payment
from django.contrib.auth import get_user_model


User = get_user_model()

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ['id', 'user', 'order', 'stripe_payment_id', 'amount', 'status', 'created_at', 'updated_at']
        read_only_fields = ['user', 'stripe_payment_id', 'status', 'created_at']