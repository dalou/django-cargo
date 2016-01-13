# encoding: utf-8

from .extended import *
from .analytics import *

# from django import template
# from django.conf import settings
# from django.db.models import Count
# from django.utils import timezone
# from taggit_templatetags.templatetags.taggit_extras import get_queryset

# register = template.Library()

@register.inclusion_tag('cargo/pagination/_digg_pagination.html')
def digg_pagination(objects):
    return {
        'objects': objects,
        'page': objects.number if hasattr(objects, 'number') else None,
        'name': u'Résultat',
        'name_plural': u'Résultats',
    }