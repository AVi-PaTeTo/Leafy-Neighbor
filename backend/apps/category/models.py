from django.db import models
from apps.product.models import Product
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)

    def __str__(self):
        return self.name
    
class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    
    def __str__(self):
        return self.name