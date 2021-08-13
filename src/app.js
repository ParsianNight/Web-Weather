const path = require('path');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utiles/geocode');
const forecast = require('./utiles/forecast');
const { query } = require('express');



// setting routes and paths for the nodejs
const publicDirectoryPath = path.join(__dirname,'../public')
//    console.log(__dirname);
//   console.log(path.join(__dirname,'../public'));
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')
//setting the assets file
app.use(express.static(publicDirectoryPath));


// using the paths we created
app.set('views' , viewsPath )
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


app.get('', (req,res) => {
    res.render('index', {
        title: ' Weather ',
        name: 'Omar',

    })
})



app.get('/about', (req,res) => {
    res.render('about',{
        description: 'a student trying to code',
        title:'About',
        name:'Omar',
    })
})



app.get('/help', (req,res) => {
    res.render('help', {
        title: ' help',
        Options: 'Contact us on : 01125252525',
        name:'Omar'
    })})

app.get('/weather', (req,res) => {
    let address = req.query.address;  // req.query ~> fetching the query hhh norm 
    if (!address) {
        return res.send({
            Erorr: 'please enter a valid address'
        })
    } 
        geocode(address, (erorr,{longtude,latitude} = {}) => {
        //console.log('Erorr', erorr)
        if (erorr){
            return res.send({
                erorr
            })
        } else if (longtude=0,latitude=0) {
            return res.send({
                erorr: 'please put correct cordinantes'
            })
        }
        forecast(longtude, latitude, (error, forcastData) => {
        // console.log('Error', error)
        // console.log(erorr,'Erorr')
        if (erorr) {
             return res.send({
                erorr
            })
        } 
       // console.log('Data', data )
        res.send({
            tempreature: forcastData.temp,
            location: address
        })
    })
    })
})


// Erorr handling
app.get('/help/*', (req,res) => {
    res.render('404', {
        name: 'Omar',
        title:'404',
        erorrmessage:'404 help page not found'
    })
})
app.get('*', (req,res) =>{
    res.render('404', {
        name: 'Omar',
        title:'404',
        erorrmessage:'404 page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})