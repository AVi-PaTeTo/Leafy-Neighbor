from rest_framework import viewsets
from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer, WishlistItemSerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer 

    # def perform_create(self, serializer):
    #     serializer.save(user = self.request.user)

class WishlistItemViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()
    serializer_class = WishlistItemSerializer 