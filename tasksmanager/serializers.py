from rest_framework import serializers

from maincrawler.serializers import GenoSpiderSerializer
from .models import SpiderTask


class SpiderTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpiderTask
        fields = ('id', 'spider', 'logs', 'status', 'extracted_items', 'scrapyd_task_id')
