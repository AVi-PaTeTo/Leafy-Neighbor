from django.shortcuts import render
from django.db.models import Subquery, OuterRef, Prefetch
from .models import Product, ProductImage, DummyIMG
from .serializers import ProductSerializer, ProductImageSerializer, DummyIMGSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.parsers import MultiPartParser,FormParser, JSONParser
from url_filter.integrations.drf import DjangoFilterBackend
from django.db.models import Avg, Count
# Create your views here.

class ProductViewSet(ModelViewSet):
    # queryset = Product.objects.select_related('vendor').prefetch_related('tags', 'categories', 'images').all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filter_fields = ['title','vendor', 'price', 'tags', 'categories']
    search_fields = ['title', 'description']
    

    def get_queryset(self):
        first_image_subquery = ProductImage.objects.filter(
            product=OuterRef('pk')
        ).order_by('id').values('image')[:1]  # Get first image path

        queryset = (
            Product.objects
            .annotate(  avg_rating_value=Avg('product_reviews__rating'), 
                        review_count=Count('product_reviews', distinct=True),
                        first_image_url=Subquery(first_image_subquery))
            .prefetch_related('images', 'tags', 'categories')
            .select_related('vendor')
        )

        order_by = self.request.query_params.get('ordering')
        if order_by == '-rating':
            queryset = queryset.order_by('-avg_rating_value')
        elif order_by == 'rating':
            queryset = queryset.order_by('avg_rating_value')
        elif order_by == '-reviews':
            queryset = queryset.order_by('-review_count')
        elif order_by == 'reviews':
            queryset = queryset.order_by('review_count')
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user.vendor_profile)

class ProdImageViewSet(ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    filter_backends = [SearchFilter]
    search_fields = ['product']

class DummyIMGViewSet(ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    queryset = DummyIMG.objects.all()
    serializer_class = DummyIMGSerializer