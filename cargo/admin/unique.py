# encoding: utf-8

import datetime
import operator

from django.contrib import admin
from django.db import models


class UniqueAdmin(admin.ModelAdmin):

    def has_add_permission(self, request):
        return self.model.objects.exists()

    def has_remove_permission(self, request):
        return self.model.objects.exists()

    def changelist_view(self, request, **kwargs):
        try:
            instance = self.model.get()
        except:
            instance = self.model.objects.first()
        return super(UniqueAdmin, self).change_view(request, "%s" % instance.pk, **kwargs)

