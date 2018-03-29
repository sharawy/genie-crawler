from rest_framework.viewsets import ModelViewSet

from .models import SpiderTask
from .serializers import SpiderTaskSerializer


class SpiderTaskViewSet(ModelViewSet):
    serializer_class = SpiderTaskSerializer
    queryset = SpiderTask.objects.all()
