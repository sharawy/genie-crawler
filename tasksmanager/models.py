from urllib.parse import urlparse

from django.contrib.postgres.fields import JSONField
from django.db import models

from genie_crawler.settings import USER_AGENT, CRAWLER_NAME, scrapyd
from maincrawler.models import GenieSpider
from . import TaskStatus


class SpiderTask(models.Model):
    spider = models.ForeignKey(GenieSpider, on_delete=models.CASCADE, related_name='tasks')
    logs = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True, default=TaskStatus.INITIATED,
                              choices=TaskStatus.CHOICES, editable=False)
    extracted_items = JSONField(blank=True, null=True, default=[])
    scrapyd_task_id = models.TextField(null=True, blank=True)

    def __str__(self):
        return "Task #{} for {}".format(self.pk, self.spider)

    def start_task(self, **kwargs):
        if self.scrapyd_task_id:
            status = self.check_status()
            if status == TaskStatus.RUNNING or status == TaskStatus.PENDING:
                return self
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
                self.status = TaskStatus.RUNNING
                self.scrapyd_task_id = task
                self.logs = ""
        except Exception as e:
            self.status = TaskStatus.ERROR
            self.logs = e

        self.save()
        return self

    def check_status(self):
        status = scrapyd.job_status('default', self.scrapyd_task_id)
        print(status)
        self.status = status
        self.save()
        return status

    def cancel_task(self):
        scrapyd.cancel('default', self.scrapyd_task_id)
        if self.status != TaskStatus.FINISHED:
            self.status = TaskStatus.CANCELED
            self.save()
        return self
