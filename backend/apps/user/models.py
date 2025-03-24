from django.db import models
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
        kwargs.setdefault("is_vendor", False)
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
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)  
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_vendor = models.BooleanField(default=False)

    USERNAME_FIELD = "email"  # Login using email instead of username
    REQUIRED_FIELDS = ["username"]  # Additional required fields for createsuperuser

    objects = CustomUserManager()

    def __str__(self):
        return self.email