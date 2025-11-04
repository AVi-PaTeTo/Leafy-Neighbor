from rest_framework import viewsets
from .models import Wishlist, WishlistItem
from apps.product.models import ProductImage
from django.db.models import Prefetch, OuterRef, Subquery
from .serializers import WishlistSerializer, WishlistItemSerializer
from rest_framework.permissions import IsAuthenticated



class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer 
    permission_classes = [IsAuthenticated]



    def get_queryset(self):
        return (
            Wishlist.objects
            .filter(user=self.request.user)
            .prefetch_related(
                Prefetch(
                    'items',
                    queryset=WishlistItem.objects
                        .select_related('product')
                )
            )
        )
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class WishlistItemViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistItemSerializer 
    permission_classes = [IsAuthenticated]
    # queryset = WishlistItem.objects.all()
    def get_queryset(self):
        first_image_qs = ProductImage.objects.filter(
            product=OuterRef('product')
        ).order_by('id').values('image')[:1]

        return (
            WishlistItem.objects
            .filter(wishlist__user=self.request.user)
            .select_related('product', 'wishlist')
            .prefetch_related('product__images')
            .annotate(first_image=Subquery(first_image_qs))
        )