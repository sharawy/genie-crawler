from rest_framework import serializers

from .models import GenoSpider


class GenoSpiderSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenoSpider
        fields = ('id', 'name', 'url', 'items_structure')
