from django.db import models

class Unique(models.Model):

    class Meta:
        abstract = True

    @staticmethod
    def get(self):
        instance = self._default_manager.objects.first()
        if not instance:
            instance = self.__class__()
        return instance

    def save(self, *args, **kwargs):
        previous = self._default_manager.objects.first()
        if previous:
            self.pk = previous.pk
        super(Unique, self).save(*args, **kwargs)
