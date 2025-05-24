from rest_framework import serializers
from .models import User, VendorProfile

class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ["id", "business_name", "created_at"]

class UserSerializer(serializers.ModelSerializer):
    vendor_profile = VendorProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "username", "phone_number", "is_vendor", "vendor_profile"]