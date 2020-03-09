const request = require('request')

const geocode = (alamat, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(alamat) + '.json?access_token=pk.eyJ1IjoibHVxbWFuZmFuYW5pIiwiYSI6ImNrMzZmNXF2bTAxMTUzZGxpaWtpMXBwNmMifQ.e9_w6PBl-hVWsrPNKMfhoA&limit=1'
    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            callback('tidak dapat terkoneksi dengan services', undefined)
        } else if (body.features.length === 0) {
            callback('tidak dapat mendapatkan lokasi yang anda cari', undefined)
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