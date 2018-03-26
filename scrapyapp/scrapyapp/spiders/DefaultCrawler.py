# -*- coding: utf-8 -*-
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule

from tasksmanager.models import SpiderTask


class DefaultCrawlerSpider(CrawlSpider):
    name = 'defaultcrawler'

    def __init__(self, *args, **kwargs):
        self.domain = kwargs.get('domain')
        self.url = kwargs.get('url')
        self.spider_conf_id = kwargs.get('spider_conf_id')
        self.start_urls = [self.url]
        self.allowed_domains = [self.domain]
        self.task = SpiderTask.objects.select_related('spider').get(pk=kwargs.get('task_id'))
        self.spider_conf = self.task.spider

        DefaultCrawlerSpider.rules = [
            Rule(LinkExtractor(unique=True), callback='parse_page', follow=kwargs.get('follow', False)),
        ]
        super(DefaultCrawlerSpider, self).__init__(*args, **kwargs)

    def get_items_structure(self):

        item_structure = self.spider_conf.extractors.all()

        return item_structure

    def parse_page(self, response):
        structures = self.get_items_structure()
        for st in structures:
            if st.xpath:

                items = response.xpath(st.xpath)
                for item in items:
                    yield self._extract_item_data(item, st)
            else:
                yield self._extract_item_data(response, st)

    def _extract_item_data(self, selector, structure):
        data = {}
        attributes = structure.attributes.all()
        for attr in attributes:
            data[attr.name] = selector.xpath(attr.xpath+"//text()").extract_first()
            print(data)

        return data
