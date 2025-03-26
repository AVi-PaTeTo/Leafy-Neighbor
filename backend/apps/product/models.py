from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    stock = models.PositiveIntegerField()
    price = models.PositiveIntegerField()