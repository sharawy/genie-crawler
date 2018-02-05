# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from maincrawler.models import ItemStructure, ItemAttribute, GenoSpider

admin.site.register(ItemStructure)
admin.site.register(ItemAttribute)
admin.site.register(GenoSpider)
