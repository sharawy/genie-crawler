from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url('^fetch_website/', views.FetchWebsiteView.as_view(), name='fetch_website')
]
