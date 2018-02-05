# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html


class ScrapyappPipeline(object):
    def __init__(self, *args, **kwargs):
        self.scraped_items = []

    def process_item(self, item, spider):
        self.scraped_items.append(item)
        return item

    def close_spider(self, spider):
        spider.task.extracted_items = self.scraped_items
        spider.task.save()
