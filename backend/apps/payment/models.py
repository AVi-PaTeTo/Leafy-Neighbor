from django.db import models
from django.contrib.auth import get_user_model
from apps.order.models import Order


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    
    # Razorpay fields
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    STATUS_CHOICES = [
        ("initiated", "Initiated"),
        ("successful", "Successful"),
        ("failed", "Failed"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="initiated")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.status}"
