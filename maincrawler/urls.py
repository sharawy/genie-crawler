from rest_framework.routers import DefaultRouter

from .views import GenieSpiderViewSet, ExtractorViewSet

router = DefaultRouter()

router.register('spiders', GenieSpiderViewSet)
router.register('extractors', ExtractorViewSet)
urlpatterns = router.urls
