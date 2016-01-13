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

    account_key_file = models.FileField(u"Adresse email", upload_to="cargo/googleapisettings/", null=True , blank=True)


    class Meta:
        verbose_name = u"Paramètres API Google"
        verbose_name_plural = u"Paramètres API Google"

    @staticmethod
    def get_settings():
        gs = GeneralSettings.objects.first()
        if not gs:
            gs = GeneralSettings()
        return gs