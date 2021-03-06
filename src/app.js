const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

// Define paths
const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(dirPath));
    
// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index', {
        title: 'Live Weather'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: '404: Help article not found'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
   
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'No search term found'
        })
    }
    res.send({
        products: []
    });
})

app.get('*', (req,res) => {
    res.render('404', {
        msg: '404: Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})