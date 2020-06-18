const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Required files
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mitchell Gamble'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mitchell Gamble'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mitchell Gamble',
        message: 'This is the messsage'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            location: location,
            forecast: forecastData,
            address: address
        })
    })
})

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        noPageMessage: 'Help page not found.',
        name: 'Mitchell Gamble'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        noPageMessage: '404 Page not found.',
        name: 'Mitchell Gamble'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})