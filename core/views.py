from html.parser import HTMLParser

from django.shortcuts import render

# Create your views here.
from django.template.response import TemplateResponse
import requests
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import TemplateHTMLRenderer, StaticHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from core.utils import add_base_tag


def home(request):
    return TemplateResponse(
        request, 'base.html')



@api_view(('GET',))
@renderer_classes((StaticHTMLRenderer,))
def simple_html_view(request):
    url = request.GET.get('url', None)
    content = "<h1>Failed to load requested url.</h1>"
    if url:
        response = requests.get(url)
        if response.status_code == 200:
            content = add_base_tag(response.content, url)
    return Response(content)