from rest_framework import serializers
from .models import CustomUser, VendorProfile

class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ["id", 'vpfp','user', "business_name", "location", "created_at"]
        read_only_fields = ["id", 'user', "created_at"]


class UserSerializer(serializers.ModelSerializer):
    vendor_profile = VendorProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ["id",'pfp', "email", "username", "phone_number", "is_vendor", "vendor_profile"]
        extra_kwargs = {
            'password': {'write_only': True},
            'is_vendor': {'required': False},
            'username': {'required': True}
        }