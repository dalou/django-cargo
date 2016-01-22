# encoding: utf-8

from django.db import models

from . import Unique

class Settings(Unique):

    class Meta:
        abstract = True
