from django.contrib.postgres.fields import JSONField
from django.db import models
from urllib.parse import urlparse

from maincrawler.models import GenoSpider
from genie_crawler.settings import USER_AGENT, CRAWLER_NAME, scrapyd
from . import TaskStatus


class SpiderTask(models.Model):
    spider = models.ForeignKey(GenoSpider, on_delete=models.CASCADE,related_name='tasks')
    logs = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True,default=TaskStatus.INITIATED)
    extracted_items = JSONField(blank=True, null=True, default=[])
    scrapyd_task_id = models.TextField(null=True, blank=True)

    def start_task(self, **kwargs):
        url = self.spider.url
        domain = urlparse(url).netloc  # parse the url and extract the domain

        settings = {
            'USER_AGENT': USER_AGENT,
        }
        try:
            task = scrapyd.schedule('default', CRAWLER_NAME,
                                    settings=settings, task_id=self.pk, url=url, spider_conf_id=self.spider.pk,
                                    domain=domain)
            if task:
                self.status = TaskStatus.STARTED
                self.task_id = task
                self.logs = ""
        except Exception as e:
            self.status = TaskStatus.ERROR
            self.logs = e

        self.save()
        return self

    def check_status(self):
        status = scrapyd.job_status('default', self.scrapyd_task_id)
        self.status = status
        self.save()
        return status

    def cancel_task(self):
        status = scrapyd.cancel('default', self.scrapyd_task_id)
        if self.status != TaskStatus.FINISHED:
            self.status = TaskStatus.CANCELED
            self.save()
        return self
