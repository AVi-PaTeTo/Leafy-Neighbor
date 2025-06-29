from .models import Product
from rest_framework import serializers
from apps.category.serializers import TagSerializer, CategorySerializer
from apps.category.models import Tag, Category

class ProductSerializer(serializers.ModelSerializer):
    vendor = serializers.ReadOnlyField(source="vendor.business_name")
    categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        required=False
    )
    tags = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        required=False
    )
    # categories_detail = CategorySerializer(source='categories', many=True, read_only=True)
    # tags_detail = TagSerializer(source='tags', many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'vendor', 'title', 'description', 'stock', 'price', 'categories', 'tags',  'created_at', 'last_modified']
        read_only_fields = ['id','vendor', 'created_at', 'last_modified', 'categories_detail', 'tags_detail']