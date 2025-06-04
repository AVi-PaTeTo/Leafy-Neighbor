from django.db import models
from django.contrib.auth import get_user_model
from apps.order.models import Order

User = get_user_model()

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    stripe_payment_id = models.CharField(max_length=100, unique=True)
    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.status
    
