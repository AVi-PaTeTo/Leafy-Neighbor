from .models import Product, ProductImage, DummyIMG
from apps.review.serializers import ReviewSerializer
from rest_framework import serializers
from apps.category.serializers import TagSerializer, CategorySerializer
from apps.category.models import Tag, Category
from django.db.models import Avg, Count


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    review_count = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()
    # avg_rating = serializers.SerializerMethodField() 
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), 
        write_only=True,
        required=False
    )
    product_image = serializers.SerializerMethodField()
    vendor_name = serializers.ReadOnlyField(source="vendor.business_name")
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

    class Meta:
        model = Product
        fields = ['id','vendor', 'vendor_name', 'title', 'review_count', 'avg_rating', 'description', 'stock', 'price', 'categories', 'tags',  'created_at', 'last_modified','product_image', 'images', 'uploaded_images']
        read_only_fields = ['id','vendor', 'vendor_name', 'created_at', 'last_modified', 'categories_detail', 'tags_detail']

    def get_product_image(self, obj):
        if hasattr(obj, 'first_image') and obj.first_image:
            request = self.context.get('request')
            return request.build_absolute_uri(f"/media/{obj.first_image}")
        return None
    
    def get_review_count(self, obj):
        if hasattr(obj, 'review_count_value'):
            return obj.review_count_value
        return obj.product_reviews.count()

    def get_avg_rating(self, obj):
        # Use annotated value if available
        if hasattr(obj, 'avg_rating_value') and obj.avg_rating_value is not None:
            return round(obj.avg_rating_value, 1)
        # Fallback in case annotation isn't applied
        avg = obj.product_reviews.aggregate(Avg('rating'))['rating__avg']
        return round(avg, 1) if avg else 0.0


    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        categories_data = validated_data.pop('categories', [])
        tags_data = validated_data.pop('tags', [])
        
        product = Product.objects.create(**validated_data)
        
        if categories_data:
            product.categories.set(categories_data)  # ManyToMany assignment
        if tags_data:
            product.tags.set(tags_data)  # If you have tags
        
        for image in uploaded_images:
            ProductImage.objects.create(product=product, image=image)
        return product
    

class DummyIMGSerializer(serializers.ModelSerializer):
    class Meta:
        model = DummyIMG
        fields = '__all__'