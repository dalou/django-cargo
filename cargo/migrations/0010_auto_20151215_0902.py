# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cargo', '0009_emailing_sending_range'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emailing',
            name='sending_range',
        ),
        migrations.AddField(
            model_name='emailing',
            name='send_range',
            field=models.IntegerField(default=100, help_text="Les tranches d'envois permette de soulager le serveur d'envoi de masse.", verbose_name="Tranche d'envois maximum par session", choices=[(20, 20), (50, 50), (70, 70), (100, 100)]),
        ),
    ]
