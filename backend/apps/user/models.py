from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.


class CustomUserManager(BaseUserManager):
    """Custom manager for the User model with email as the unique identifier."""

    def _create_user(self, email, password, **extra_fields):
        """Helper method to create a user."""
        if not email:
            raise ValueError("User must have an Email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_user(self, email, password=None, **kwargs):
        """Create and return a regular user."""
        kwargs.setdefault("is_active", True)
        kwargs["is_vendor"] = kwargs.get("is_vendor", False)
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", False)

        return self._create_user(email, password, **kwargs)

    def create_superuser(self, email, password, **kwargs):
        """Create and return a superuser."""
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)

        return self._create_user(email, password, **kwargs)

    def create_vendor(self, email, password=None, **kwargs):
        """Create and return a vendor user."""
        kwargs.setdefault("is_vendor", True)

        return self._create_user(email, password, **kwargs)
    

class CustomUser(AbstractUser):
    """Custom user model extending AbstractUser"""
    pfp = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)  
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_vendor = models.BooleanField(default=False)

    USERNAME_FIELD = "email"  # Login using email instead of username
    REQUIRED_FIELDS = ["username"]  # Additional required fields for createsuperuser

    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
class VendorProfile(models.Model):
    """Vendor profile model extending customuser"""
    vpfp = models.CharField(max_length=255, blank=True, null=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="vendor_profile")
    business_name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.business_name

@receiver(post_save, sender=CustomUser)
def create_vendor_profile(sender, instance, created, **kwargs):
    if created and instance.is_vendor:
        # Create VendorProfile if user is vendor on creation
        VendorProfile.objects.create(user=instance, business_name='')

@receiver(post_save, sender=CustomUser)
def update_vendor_profile(sender, instance, **kwargs):
    # If is_vendor changed to True and profile doesn't exist, create it
    if instance.is_vendor and not hasattr(instance, 'vendor_profile'):
        VendorProfile.objects.create(user=instance, business_name='')