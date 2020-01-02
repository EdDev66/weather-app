const request = require('request');

const geocode = (adress, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiZWR1MTMzOCIsImEiOiJjazRpNWF0NmswMXVsM2xxbmMxMTF0NXBzIn0.SfjdGi7VePzrNh83CCIowA';

    request ({ url: geoUrl, json: true }, (error, { body }) => {

        if(error) {
            callback('Unable to access API', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try a new one.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    }

    module.exports = geocode