from django.contrib import admin

# Register your models here.
from .models import SpiderTask, ExportFile

admin.site.register(SpiderTask)
admin.site.register(ExportFile)
