const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/0b60bef97da7269eaf09fe92a4f18e8f/' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '?lang=id'
    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            callback('tidak dapat terkoneksi dengan services', undefined)
        } else if (body.error) {
            callback('lat,lng tidak ditemukan , silahkan masukkan kordinat lain', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + 'it is currently ' + body.currently.temperature + '.the is a ' + body.currently.precipProbability + '% chance of rain.')

        }
    })
}
module.exports = forecast