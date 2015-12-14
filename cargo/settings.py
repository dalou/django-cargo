import os
from django.conf import settings
from django.contrib.staticfiles import finders

CARGO_TINYMCE_URL = getattr(settings, 'CARGO_TINYMCE_URL', "//tinymce.cachefly.net/4.3/tinymce.min.js")

CARGO_TINYMCE_DEFAULT_CONFIG = getattr(settings, 'CARGO_TINYMCE_DEFAULT_CONFIG',
    {
        # 'theme': "simple",
        'relative_urls': False
    }
)