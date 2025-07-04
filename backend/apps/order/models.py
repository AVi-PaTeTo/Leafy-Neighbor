from django.db import models
from django.contrib.auth import get_user_model
from apps.product.models import Product
User = get_user_model()


class Order(models.Model):
    STATUS_CHOICE = (
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled')
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    shipping_address = models.TextField(null=False, blank=False)

    class Meta:
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['user'])
        ]

    def calculate_total(self):
        return sum(item.quantity * item.unit_price for item in self.order_items.all())

    def __str__(self):
        return f"Order #{self.id} - {self.user.username if self.user else 'Guest'}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    
    product_name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        indexes = [
            models.Index(fields=['order']),
            models.Index(fields=['product'])
        ]

    def __str__(self):
        return f"{self.quantity} x {self.product.name if self.product else 'Deleted Product'} @ {self.unit_price}"
