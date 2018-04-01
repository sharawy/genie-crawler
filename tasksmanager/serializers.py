from rest_framework import serializers

from .models import SpiderTask, ExportFile


class SpiderTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpiderTask
        fields = ('id', 'spider', 'logs', 'status', 'extracted_items')


class ExportFileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(read_only=True)

    class Meta:
        model = ExportFile
        fields = ('type', 'task', 'file')
