# encoding: utf-8

import datetime
import operator

from django.contrib import admin
from django.db import models

from ..models import *

class GoogleAPISettingsAdmin(admin.ModelAdmin):
    pass
admin.site.register(GoogleAPISettings, GoogleAPISettingsAdmin)