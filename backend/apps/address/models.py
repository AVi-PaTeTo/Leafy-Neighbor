from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Address(models.Model):
    HOME = 'home'
    WORK = 'work'
    OTHER = 'other'

    ADDRESS_TYPES = [
        (HOME, 'Home'),
        (WORK, 'Work'),
        (OTHER, 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=10, choices=ADDRESS_TYPES, default=HOME)
    name = models.CharField(max_length=255, blank=False, null=False)
    phone = models.CharField(max_length=15, blank=False, null=False)
    house = models.CharField(max_length=100)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.street}, {self.city}"