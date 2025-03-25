from django.shortcuts import render
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets
# Create your views here.

User = get_user_model()

class UserApiView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer