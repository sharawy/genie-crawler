from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from tasksmanager.models import SpiderTask
from tasksmanager.serializers import SpiderTaskSerializer
from .models import GenieSpider, Extractor
from .serializers import GenieSpiderSerializer, ExtractorSerializer, AttributeSerializer


class GenieSpiderViewSet(ModelViewSet):
    serializer_class = GenieSpiderSerializer
    queryset = GenieSpider.objects.all()

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


class ExtractorViewSet(ModelViewSet):
    serializer_class = ExtractorSerializer
    queryset = Extractor.objects.all()

    @detail_route(methods=['post'], url_path='add_attribute', serializer_class=AttributeSerializer)
    def add_attribute(self, request, pk):
        extractor = self.get_object()
        attr_serializer = AttributeSerializer(data=request.data)
        if attr_serializer.is_valid():
            attribute = attr_serializer.save()
            extractor.attributes.add(attribute)

            return Response(attr_serializer.data, status=status.HTTP_201_CREATED)

        return Response(attr_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['delete'], url_path='remove_attribute/(?P<attribute_id>[0-9]+)')
    def remove_attribute(self, request, pk, attribute_id):
        extractor = self.get_object()
        extractor.attributes.filter(pk=attribute_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
