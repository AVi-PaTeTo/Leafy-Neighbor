from django.shortcuts import render
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, VendorProfileSerializer
from .models import VendorProfile
from rest_framework import viewsets
# Create your views here.

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VendorProfileViewSet(viewsets.ModelViewSet):
    queryset = VendorProfile.objects.all()
    serializer_class = VendorProfileSerializer