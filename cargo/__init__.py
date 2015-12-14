try:
    default_app_config = 'cargo.DefaultConfig'

    from django.apps import AppConfig

    class DefaultConfig(AppConfig):
        name = 'cargo'
        verbose_name = u"Extensions"

        def ready(self):

            from . import models

except:
    # Prevent from package setup
    pass
