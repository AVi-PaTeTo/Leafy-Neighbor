from django.shortcuts import render
from .models import Category, Tag, TagGroup
from .serializers import CategorySerializer,TagSerializer, TagGroupSerializer
from rest_framework import viewsets
# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagGroupViewSet(viewsets.ModelViewSet):
    queryset = TagGroup.objects.prefetch_related('tags').all()
    serializer_class = TagGroupSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
 
