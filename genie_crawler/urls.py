"""geno_crawler URL Configuration

"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.documentation import include_docs_urls

from tasksmanager.urls import urlpatterns as tasks_urls
from maincrawler.urls import urlpatterns as spider_urls
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='Geno Crawler Api')),

    url(r"^", include(tasks_urls)),
    url(r"^", include(spider_urls)),
]
