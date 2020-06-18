const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2c4459bedc80411ec0ab5027189f5b89&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.success === false) {
            callback('Unable to find location', undefined)
        } else {
        callback(undefined, {
            description: body.current.weather_descriptions + '. ',
            temperature: 'It is currently ' + body.current.temperature + ' degress out but ',
            feelsLike: 'it feels like ' + body.current.feelslike + ' degress out. ',
            wind_speed: 'The wind is currently ' + body.current.wind_speed + ' miles an hour. ',
            wind_dir: 'The wind is blowing from the ' + body.current.wind_dir
        })
        }
    })
}


module.exports = forecast