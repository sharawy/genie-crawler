from rest_framework.routers import DefaultRouter

from .views import SpiderTaskViewSet

router = DefaultRouter()

router.register('tasks', SpiderTaskViewSet)
urlpatterns = router.urls
# urlpatterns = [
#     url(r'(?P<pk>\d+)/start/', views.start_task, name='start_task'),
#     url(r'(?P<pk>\d+)/cancel/', views.cancel_task, name='cancel_task'),
# ]
