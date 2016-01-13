import json
from oauth2client.client import SignedJwtAssertionCredentials

from django import template

register = template.Library()

@register.inclusion_tag('cargo/analytics/analytics.html', takes_context=True)
def analytics(context, view_id, next = None):

    ANALYTICS_CREDENTIALS_JSON = 'absolute/path/to/service.json'

    # The scope for the OAuth2 request.
    SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

    # # The location of the key file with the key data.
    # KEY_FILEPATH = ANALYTICS_CREDENTIALS_JSON

    # # Load the key file's private data.
    # with open(KEY_FILEPATH) as key_file:
    #     _key_data = json.load(key_file)

    # Construct a credentials objects from the key data and OAuth2 scope.
    try:
        _credentials = SignedJwtAssertionCredentials(
            'autrusseau.damien@gmail.com',
            'AIzaSyDrwNNKTlD-FwCvoovFi7Uem9N3gH4dLTY',
            SCOPE
        )
    except:
        pass

    return {
        'token': 'AIzaSyDrwNNKTlD-FwCvoovFi7Uem9N3gH4dLTY',#_credentials.get_access_token().access_token,
        'view_id': view_id
    }