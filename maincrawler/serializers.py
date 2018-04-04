from rest_framework import serializers

from .models import GenieSpider, Extractor, ItemAttribute


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemAttribute
        fields = ('id', 'xpath', 'name')


class ExtractorSerializer(serializers.ModelSerializer):
    attributes = AttributeSerializer(many=True, read_only=True)

    class Meta:
        model = Extractor
        fields = ('id', 'xpath', 'attributes', 'spider')


class GenieSpiderSerializer(serializers.ModelSerializer):
    extractors = ExtractorSerializer(many=True)

    class Meta:
        model = GenieSpider
        fields = ('id', 'name', 'url', 'extractors',)
