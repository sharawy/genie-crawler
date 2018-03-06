from django.shortcuts import render

# Create your views here.
from django.template.response import TemplateResponse
import requests
from rest_framework.decorators import api_view
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


def home(request):
    return TemplateResponse(
        request, 'base.html')



class FetchWebsiteView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'websiteframe.html'

    def get(self, request):
        content = "Failed to load requested url."
        url = request.GET.get('url',None)
        if url:
            response = requests.get(url)
            if response.status_code == 200:
                content = response.content
        return Response({'content': content})