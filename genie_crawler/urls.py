"""genie_crawler URL Configuration

"""
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.views import serve
from rest_framework.documentation import include_docs_urls

from core.urls import urlpatterns as core_urls
from genie_crawler import settings
from maincrawler.urls import urlpatterns as spider_urls
from tasksmanager.urls import urlpatterns as tasks_urls

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='Genie Crawler Api')),

    url(r"^", include(core_urls)),
    url(r"^", include(spider_urls)),
    url(r"^", include(tasks_urls)),

]

if settings.DEBUG:
    urlpatterns += [
                       url(r'^static/(?P<path>.*)$', serve)
                   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
