"""genie_crawler URL Configuration

"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.documentation import include_docs_urls

from core.urls import urlpatterns as core_urls
from core.views import home
from tasksmanager.urls import urlpatterns as tasks_urls
from maincrawler.urls import urlpatterns as spider_urls
urlpatterns = [
    url(r'^$', home,name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='Genie Crawler Api')),

    # url(r"^", include(tasks_urls)),
    url(r"^", include(spider_urls)),

]
