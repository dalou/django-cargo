
from gmaps import Geocoding
from gmaps.errors import NoResults, GmapException, InvalidRequest

def geocode(address):

    api = Geocoding()
    if address.strip() != '':
        original_address = address.strip()
        try:
            results = api.geocode(original_address)

            if len(results):
                results[0]['lng'] = results[0].get('geometry', {}).get('location', {}).get('lng', None)
                results[0]['lat'] = results[0].get('geometry', {}).get('location', {}).get('lat', None)
                return results[0]

        except NoResults, e:
            return { 'error': 'NoResults', 'message': str(e.message)  }
        except GmapException, e:
            return { 'error': 'GmapException', 'message': str(e.message) }
        except InvalidRequest, e:
            return { 'error': 'InvalidRequest', 'message': str(e.message) }
        except Exception, e:
            return { 'error': 'Exception', 'message': str(e.message) }
    return { 'error': 'EmptyAddress' }