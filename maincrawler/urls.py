from rest_framework.routers import DefaultRouter

from .views import GenoSpiderViewSet

router = DefaultRouter()

router.register('spiders', GenoSpiderViewSet)
urlpatterns = router.urls