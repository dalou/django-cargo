# encoding: utf-8
import datetime
import operator
import hashlib
import urllib
import random
import re

from django.conf import settings
from django.db import models
from django.conf import settings
from django.contrib import auth, messages
from django.contrib.sites.models import Site
from django.contrib.auth import get_user_model
from django.utils import timezone

from ..utils import *



class GoogleAPISettings(models.Model):

    account_key_file = models.FileField(u"Adresse email", upload_to="cargo/googleapisettings/", null=True , blank=True, help_text=u"""
            <div style="font-size:16px;">
            Allez sur <a target="_blank" href="https://console.developers.google.com/apis/">https://console.developers.google.com/apis/</a>
            <br/>
            Cliquer sur identifiants
            <br/>
            Cliquer sur nouveaux identifiants
            <br/>
            Cliquer sur Créér un compte de service
            <br/>
            Nommer le compte, copier/coller l'ID du compte de service, puis cocher JSON
            <br/>
            Cliquer sur Créér
            <br/>
            Ajouter le compte (ID copier/coller) en lecture seule dans votre compte analytics (<a target="_blank" href="https://www.google.com/analytics/web/">https://www.google.com/analytics/web/</a>)
            <br/>
            Puis ajouter ici le fichier telechargé depuis la page Google Developpers Console (aprés avoir cliqué sur Créér)
            </div>
        """)
    analytics_default_view_id = models.CharField(u"ID de la vue Analytics par defaut.", max_length=254, null=True , blank=True)


    class Meta:
        verbose_name = u"Paramètres API Google"
        verbose_name_plural = u"Paramètres API Google"

    @staticmethod
    def get_settings():
        gs = GeneralSettings.objects.first()
        if not gs:
            gs = GeneralSettings()
        return gs