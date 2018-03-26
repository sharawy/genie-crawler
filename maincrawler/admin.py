# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from maincrawler.models import Extractor, ItemAttribute, GenieSpider

admin.site.register(Extractor)
admin.site.register(ItemAttribute)
admin.site.register(GenieSpider)
