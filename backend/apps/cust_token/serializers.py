from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from apps.user.models import CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        email = attrs.get("email")

        # Check if user exists first
        if not CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"detail": "Account not found. Please sign up."})

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError({"detail": "Invalid password. Please try again."})

        if not user.is_active:
            raise serializers.ValidationError({"detail": "Account is inactive. Please contact support."})

        data = super().validate(attrs)
        return data
