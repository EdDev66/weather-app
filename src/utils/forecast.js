const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/59ddb5c6472cdae0fd43ceb52fb2c1ae/' + lat + ',' + long + '?units=si&lang=ro'

    request({ url, json:true}, (error,{ body }) => {

        if(error) {
            callback('URL not found!', undefined);
        } else if (body.error) {
            callback('Location not found', undefined);
        } else {
            callback(undefined,body.currently.temperature + ' De grade afara');
        }
    })

}

module.exports = forecast;