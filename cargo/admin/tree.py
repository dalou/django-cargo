# encoding: utf-8

import datetime
import operator
import re

from django import forms
from django.conf import settings
from django.contrib import admin



class TreeAdmin(admin.ModelAdmin):


    list_per_page = 500
    list_display = (
        'parent',
        'order',
        'is_required',
        'is_independant',
    )
    list_editable = ('is_required', 'is_independant', 'order', 'parent')


    @property
    def media(self):
        media = super(TreeAdmin, self).media
        css = {
            "all": (
                'vendors/select2/4.0.0/css/select2.min.css',
            )
        }
        js = [
            'vendors/select2/4.0.0/js/select2.min.js',
            'vendors/jquery.mjs.nestedSortable.js',
            'cargo/admin/tree_change_list.js',
        ]
        media.add_css(css)
        media.add_js(js)
        return media

    def get_changelist_form(self, request, **kwargs):
        kwargs.setdefault('form', self.form)
        return super(TreeAdmin, self).get_changelist_form(request, **kwargs)

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        return super(TreeAdmin, self).changelist_view(request, extra_context=extra_context)

    def get_queryset(self, request):
        return (super(TreeAdmin, self).get_queryset(request)
            .prefetch_related('children')
            .select_related('parent')
        )