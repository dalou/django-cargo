from django.db import models
from ..forms.tree import TreeField

class TreeManyToManyField(models.ManyToManyField):

    def formfield(self, **kwargs):
        defaults = {
            'form_class': TreeField
        }
        return super(TreeManyToManyField, self).formfield(**defaults)

class TreeForeignKey(models.ForeignKey):
    pass
    # def formfield(self, *args, **kwargs):
    #     # defaults = {
    #     #     'form_class': TreeField
    #     # }
    #     return super(TreeForeignKey, self).formfield(*args, **kwargs)