# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class GenieSpider(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()

    def __str__(self):
        return self.name or self.url


class ItemAttribute(models.Model):
    name = models.CharField(max_length=100)
    xpath = models.TextField()

    def __str__(self):
        return self.name


class Extractor(models.Model):
    xpath = models.TextField(blank=True, null=True)
    details_url = models.TextField(help_text="Xpath for item details url", blank=True, null=True)
    attributes = models.ManyToManyField(ItemAttribute)
    spider = models.ForeignKey(GenieSpider, on_delete=models.CASCADE,related_name='extractors')
