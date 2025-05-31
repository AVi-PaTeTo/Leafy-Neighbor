from django.contrib import admin
from django.urls import path, include
from apps.user.views import UserViewSet
from apps.product.views import ProductViewSet
from apps.address.views import AddressViewSet
from apps.category.views import CategoryViewSet, TagViewSet
from apps.review.views import ReviewViewSet
from apps.wishlist.views import WishlistViewSet, WishlistItemViewSet
from apps.cart.views import CartViewSet, CartItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'addresses', AddressViewSet, basename='addresses')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'wishlists', WishlistViewSet, basename='wishlist')
router.register(r'wishlist-items', WishlistItemViewSet, basename='wishlistitem')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
