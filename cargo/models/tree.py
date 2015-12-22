# encoding: utf-8

from django.conf import settings
from django.db import models
from django.utils.text import slugify

from django import forms
from itertools import chain

class Tree(models.Model):

    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', db_index=True)
    order = models.IntegerField(u"Ordre", default=0)
    level = models.PositiveIntegerField(u"Profondeur", default=0)

    is_required = models.BooleanField(u"Requit ?", default=False)
    is_independant = models.BooleanField(u"Indépendant ?", default=False)
    is_multiple = models.BooleanField(u"Choix multiple ?", default=False)

    class Meta:
        abstract = True
        ordering = ('-level', 'order', )
        verbose_name = u'Catégorie'
        verbose_name_plural = u'Catégories'


    def save(self, *args, **kwargs):
        if self.parent:
            self.level = self.parent.level + 1
        super(Tree, self).save(*args, **kwargs)

    def get_descendants(self, include_self=False):
        return self.children.all()


    def set_children_list(self, queryset=None):
        if hasattr(self, '_children_list'):
            delattr(self, '_children_list')
        return self.get_children_list(queryset=queryset)

    def get_children_list(self, queryset=None):
        if hasattr(self, '_children_list'):
            return getattr(self, '_children_list')

        if queryset:
            categories = queryset
        else:
            categories = self.__class__.objects.all()

        categories = categories.select_related('parent')

        tree = {}
        _children_list = []
        for category in categories:
            category._children_list = []
            tree[category.pk] = category

        for pk, element in tree.items():
            if element.parent_id:
                parent = tree.get(element.parent_id, element.parent)
                # element.parent = parent
                if parent:
                    if not hasattr(parent, '_children_list'):
                        setattr(parent, '_children_list', [])
                    parent._children_list.append(element)

        if tree.get(self.pk):
            _children_list = tree.get(self.pk)._children_list
        else:
            _children_list = []

        setattr(self, '_children_list', _children_list)
        return self._children_list
