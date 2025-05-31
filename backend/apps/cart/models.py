from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from apps.product.models import Product


User = get_user_model()


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart")
    last_updated = models.DateTimeField(auto_now=True)
    
    @property
    def total(self):
        return sum(item.price * item.quantity for item in self.items.all())

    def __str__(self):
        return f"{self.user.username}'s cart"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    added_on = models.DateTimeField(auto_now_add=True)
    
    @property
    def price(self):
        return self.product.price

    def clean(self):
        if self.quantity > self.product.stock:
            raise ValidationError(f"Quantity cannot exceed available stock ({self.product.stock})")
        
    class Meta:
        unique_together = ['cart', 'product']