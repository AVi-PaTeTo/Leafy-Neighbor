from django.shortcuts import render
from .models import Address
from .serializers import AddressSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Address.objects.filter(user = self.request.user)

    def perform_create(self, serializer):
        is_default = self.request.data.get('is_default', False)
        if is_default == 'true':
            Address.objects.filter(user=self.request.user, is_default=True).update(is_default=False)
        serializer.save(user = self.request.user)

    def perform_update(self, serializer):
        is_default = self.request.data.get('is_default', False)
        address = self.get_object()
        if is_default == 'true' and not address.is_default:
            Address.objects.filter(user=self.request.user, is_default=True).update(is_default=False)
        serializer.save(user = self.request.user)