from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from tasksmanager.models import SpiderTask
from tasksmanager.serializers import SpiderTaskSerializer
from .models import GenieSpider
from .serializers import GenieSpiderSerializer


class GenieSpiderViewSet(ModelViewSet):
    serializer_class = GenieSpiderSerializer
    queryset = GenieSpider.objects.all()

    # permission_classes = (IsAuthenticated,)

    @detail_route(methods=['get'], url_path='start_task')
    def start_task(self, request, pk):
        spider = self.get_object()
        task, created = SpiderTask.objects.get_or_create(spider=spider)
        task.start_task()
        serializer = SpiderTaskSerializer(instance=task)

        return Response(serializer.data)

    @detail_route(methods=['get'])
    def create_task(self, request, pk):
        spider = self.get_object()
        task = SpiderTask.objects.create(spider=spider)
        serializer = SpiderTaskSerializer(instance=task)

        return Response(serializer.data)
