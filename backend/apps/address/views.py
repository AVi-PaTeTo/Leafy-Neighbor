from django.shortcuts import render
from .models import Address
from .serializers import AddressSerializer
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer