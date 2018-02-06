from rest_framework.routers import DefaultRouter

from .views import GenieSpiderViewSet

router = DefaultRouter()

router.register('spiders', GenieSpiderViewSet)
urlpatterns = router.urls