# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import os

from scrapy.exporters import CsvItemExporter, XmlItemExporter

from genie_crawler.settings import MEDIA_ROOT
from tasksmanager import TaskStatus
from tasksmanager.models import ExportFile


class ScrapyappPipeline(object):
    def __init__(self, *args, **kwargs):
        self.scraped_items = []

    def process_item(self, item, spider):
        self.scraped_items.append(item)
        return item

    def close_spider(self, spider):
        spider.task.extracted_items = self.scraped_items
        spider.task.status = TaskStatus.FINISHED
        spider.task.save()


class BaseExporter(object):
    def __init__(self):
        self.extension = 'json'
        self.file_name = None

    def get_exporter(self, file):
        raise NotImplementedError

    def open_spider(self, spider):
        self.file_name = os.path.join('exports', "{}-{}.{}".format(spider.spider_conf, spider.task.pk, self.extension))
        path = os.path.join(MEDIA_ROOT, self.file_name)
        self.file = open(path, 'wb')
        self.exporter = self.get_exporter(self.file)  #
        self.exporter.start_exporting()

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()
        ExportFile.objects.get_or_create(task=spider.task, file=self.file_name, type=self.extension)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item


class CsvPipeline(BaseExporter):
    def __init__(self):
        self.extension = 'csv'

    def get_exporter(self, file):
        return CsvItemExporter(file)


class XMLPipeline(BaseExporter):
    def __init__(self):
        self.extension = 'xml'

    def get_exporter(self, file):
        return XmlItemExporter(file)
