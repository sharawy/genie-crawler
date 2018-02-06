from rest_framework import serializers

from .models import GenieSpider


class GenieSpiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenieSpider
        fields = ('id', 'name', 'url', 'items_structure')
