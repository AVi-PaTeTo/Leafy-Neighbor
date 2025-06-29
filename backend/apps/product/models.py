from django.db import models
from django.contrib.auth import get_user_model
from apps.category.models import Category, Tag
from apps.user.models import VendorProfile

User = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=255)
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE, related_name="products")
    description = models.TextField()
    stock = models.PositiveIntegerField()
    price = models.PositiveIntegerField()

    categories = models.ManyToManyField(Category, related_name="products")
    tags = models.ManyToManyField(Tag, related_name="products")
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified =  models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return self.title