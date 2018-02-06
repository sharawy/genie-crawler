# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class ItemAttribute(models.Model):
    name = models.CharField(max_length=100)
    xpath = models.TextField()


class ItemStructure(models.Model):
    xpath = models.TextField()
    details_url = models.TextField(help_text="Xpath for item details url", blank=True, null=True)
    attributes = models.ManyToManyField(ItemAttribute)


class GenieSpider(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()
    items_structure = models.ManyToManyField(ItemStructure)

    def __str__(self):
        return self.name



