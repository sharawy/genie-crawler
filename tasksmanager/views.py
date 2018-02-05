from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from .models import SpiderTask
from .serializers import SpiderTaskSerializer


def start_task(request, pk):
    task = get_object_or_404(SpiderTask, pk=pk)
    task.start_task()


def cancel_task(request, pk):
    task = get_object_or_404(SpiderTask, pk=pk)
    task.cancel_task()


class SpiderTaskViewSet(ModelViewSet):
    serializer_class = SpiderTaskSerializer
    queryset = SpiderTask.objects.all()
    permission_classes = (IsAdminUser,)
