var Pokemon = require('../models/Pokemon');

var path = require('path');
var geolib = require('geolib');

module.exports = function(app, io) {

    //to get all pokemon details
    app.get('/pokemons', function(req, res) {
        console.log("ffg");

        Pokemon.find(function(err, pokemons) {
            if (err) {
                res.send(err);
            }

            res.json(pokemons);
        });
    });

    //to feed pokemon data
    app.post('/pokemons', function(req, res) {

        var pokemonData = new Pokemon();
        pokemonData.name = req.body.name;

        pokemonData.loc.latitude = req.body.latitude,
            pokemonData.loc.longitude = req.body.longitude

        pokemonData.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Pokemon sent!'
            });
        });


    });

    //to find pokemon in nearest range 
    app.get('/pokemon/:latitude,:longitude', function(req, res) {
        /*var newlat = (((31.34 + 1)/40,075) * 360);
        var newlong = (((31.65 + 1)/40,075) * 360);
              console.log(newlat," wow ",newlong," sd");*/
        Pokemon.find({
            $and: [{
                'loc.latitude': req.params.latitude
            }, {
                'loc.longitude': req.params.longitude
            }]
        }, function(err, results) {
            if (err)
                res.send(err);


            res.json(results);
        });
    });



};


function distance(lat1, lon1, lat2, lon2, unit) {
    unit = "K";
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}