from rest_framework import serializers
from .models import CustomUser, VendorProfile

class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ["id", "business_name", "created_at"]

class UserSerializer(serializers.ModelSerializer):
    vendor_profile = VendorProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "phone_number", "is_vendor", "vendor_profile"]