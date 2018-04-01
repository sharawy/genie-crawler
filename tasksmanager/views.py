import os
from tempfile import TemporaryFile

from requests import Response
from rest_framework.decorators import detail_route
from rest_framework.viewsets import ModelViewSet
from scrapy.exporters import XmlItemExporter

from genie_crawler.settings import MEDIA_ROOT
from .models import SpiderTask
from .serializers import SpiderTaskSerializer


class SpiderTaskViewSet(ModelViewSet):
    serializer_class = SpiderTaskSerializer
    queryset = SpiderTask.objects.all()

    @detail_route(methods=['post'], url_path='export')
    def export(self, request, pk):
        pass
