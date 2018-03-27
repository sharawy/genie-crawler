from rest_framework.decorators import detail_route
from rest_framework.permissions import IsAuthenticated
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

    @detail_route(methods=['get'], url_path='start_task/(?P<task_id>[0-9]+)')
    def start_task(self, request, pk, task_id):
        spider = self.get_object()
        task = spider.tasks.get(pk=task_id).start_task()
        return Response({"status": task.status})

    @detail_route(methods=['get'])
    def create_task(self, request,pk):
        spider = self.get_object()
        task = SpiderTask.objects.create(spider=spider)
        serializer = SpiderTaskSerializer(instance=task)

        return Response(serializer.data)
