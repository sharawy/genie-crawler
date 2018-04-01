from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import SpiderTask
from .serializers import SpiderTaskSerializer, ExportFileSerializer


class SpiderTaskViewSet(ModelViewSet):
    serializer_class = SpiderTaskSerializer
    queryset = SpiderTask.objects.all()

    @detail_route(methods=['post'], url_path='export', serializer_class=ExportFileSerializer)
    def export(self, request, pk):
        file = self.get_object().exported_file.filter(type=request.data['type']).first()
        return Response(self.get_serializer(instance=file).data)
