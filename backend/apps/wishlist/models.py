from django.db import models
from apps.product.models import Product
from django.contrib.auth import get_user_model

User = get_user_model()

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlists")
    name = models.CharField(max_length=255, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.name}"
    
    class Meta:
        unique_together = ('user','name') 


class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('wishlist', 'product')

    def __str__(self):
        return f"{self.product.title} in {self.wishlist.name}"