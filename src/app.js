const path = require('path')
const express = require('express')
const hbs = require('hbs')

// local utils
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// definisakan path untuk konfigurasi express
const publiDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setting mesin handlebars dan lokasi tampilan
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setting direktori daring untuk penyedia
app.use(express.static(publiDirPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Luqman Fanani MZ'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Luqman Fanani MZ'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'halaman bantuan',
        name: 'Luqman Fanani MZ'
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.alamat) {
        return res.send({
            error: 'alamat tidak ditemukan !'
        })
    }

    geocode(req.query.alamat, (err, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (err) {
            return res.send({
                err
            })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                forecast: forecastData,
                location,
                alamat: req.query.alamat
            })
        })

    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide your search'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Halaman yang anda cari tidak ada, 404',
        name: 'nanang'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Halaman tidak ditemukan, 404',
        name: 'nanang'
    })
})
app.listen(port, () => {
    console.log('server running on port'+ port)
})