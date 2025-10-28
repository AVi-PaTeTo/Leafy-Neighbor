from django.contrib import admin
from django.urls import path, include
from apps.user.views import UserViewSet, VendorProfileViewSet
from apps.product.views import ProductViewSet, ProdImageViewSet, DummyIMGViewSet
from apps.address.views import AddressViewSet
from apps.category.views import CategoryViewSet,TagGroupViewSet, TagViewSet
from apps.review.views import ReviewViewSet
from apps.wishlist.views import WishlistViewSet, WishlistItemViewSet
from apps.cart.views import CartViewSet, CartItemViewSet
from apps.order.views import OrderViewSet, OrderItemViewSet
from apps.payment.views import PaymentViewSet
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
                                            TokenObtainPairView,
                                            TokenRefreshView,
                                            )
from drf_spectacular.views import (
                                    SpectacularAPIView, 
                                    SpectacularRedocView, 
                                    SpectacularSwaggerView
                                    )
                                    
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'vendors', VendorProfileViewSet, basename='vendors')
router.register(r'products', ProductViewSet, basename='products')

router.register(r'product-images', ProdImageViewSet, basename='productimages')

router.register(r'addresses', AddressViewSet, basename='addresses')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'tag-groups', TagGroupViewSet, basename='tagsgroups')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'wishlists', WishlistViewSet, basename='wishlist')
router.register(r'wishlist-items', WishlistItemViewSet, basename='wishlistitem')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-items', OrderItemViewSet, basename='orderitem')
router.register(r'payments', PaymentViewSet, basename='payment')




router.register(r'dummy-images', DummyIMGViewSet, basename='dummyimages')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    #token authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [path('silk/', include('silk.urls', namespace='silk'))]