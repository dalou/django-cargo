# encoding: utf-8

from .extended import *

from ..models import GoogleAPISettings
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

import json
from oauth2client.client import SignedJwtAssertionCredentials

@register.inclusion_tag('cargo/analytics/analytics.html', takes_context=True)
def analytics(context, view_id=None, next = None):

    # The scope for the OAuth2 request.
    SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
    token = ""



    ggsettings = GoogleAPISettings.objects.first()

    if ggsettings and ggsettings.account_key_file:

        if not view_id:
            view_id = ggsettings.analytics_default_view_id

        _key_data = json.load(ggsettings.account_key_file)

        # Construct a credentials objects from the key data and OAuth2 scope.
        try:
            _credentials = SignedJwtAssertionCredentials(
                _key_data['client_email'],
                _key_data['private_key'],
                SCOPE,
                # token_uri='https://accounts.google.com/o/oauth2/token'
            )
            token = _credentials.get_access_token().access_token
        except Exception, e:
            print e.message
            token = ""


    return {
        'token': token,
        'view_id': view_id
    }