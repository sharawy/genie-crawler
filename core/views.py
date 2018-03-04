from django.shortcuts import render

# Create your views here.
from django.template.response import TemplateResponse


def home(request):
    return TemplateResponse(
        request, 'base.html')