var express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('WandeRO', 'mirandal', '', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306
});

var app = express();
app.use(bodyParser.json());
app.use(cors());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));
app.listen(process.env.PORT);

app.use('/admin', express.static('admin'));

var Region = sequelize.define('Regions', {

    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    description: {
        type: Sequelize.STRING,
        field: 'description'
    }
}, {
    freezeTableName: false,
    timestamps: false

});




app.post('/regions', function(req, res) {
    Region.create(req.body).then(function(region) {
        Region.findById(region.id).then(function(region) {
            res.status(201).send(region);
        });
    });
});

app.get('/regions', function(req, res) {
    Region.findAll().then(function(regions) {
        res.status(200).send(regions);
    });
});

app.get('/regions/:id', function(req, res) {
    Region.findById(req.params.id).then(function(region) {
        if (region) {
            res.status(200).send(region);
        }
        else {
            res.status(404).send();
        }
    });
});


var City = sequelize.define('Cities', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    description: {
        type: Sequelize.STRING,
        field: 'description'
    },
    photo: {
        type: Sequelize.UUID,
        field: 'photo'
    },
    id_region: {
        type: Sequelize.INTEGER,
        field: 'id_region'
    }
}, {
    timestamps: false
});

app.post('/cities', function(req, res) {
    City.create(req.body).then(function(city) {
        City.findById(city.id).then(function(city) {
            res.status(201).send(city);
        });
    });
});

app.get('/cities', function(request, response) {
    City.findAll().then(function(cities) {
        response.status(200).send(cities);
    });
});

app.get('/cities/:id', function(req, res) {
    City.findById(req.params.id).then(function(city) {
        if (city) {
            res.status(200).send(city);
        }
        else {
            res.status(404).send();
        }
    });
});

app.put('/cities/:id', function(req, res) {
    City
        .findById(req.params.id)
        .then(function(city) {
            if (city) {
                city
                    .updateAttributes(req.body)
                    .then(function() {
                        res.status(200).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        res.status(500).send('error');

                    });
            }
            else {
                res.status(404).send();
            }
        });
});

app.delete('/cities/:id',function(req,res){
    City
    .findById(req.params.id)
    .then(function(city) {
        if(city){
            city.destroy()
            .then(function(){
                res.status(204).send();
            })
            .catch(function(error){
                console.warn(error);
                res.status(500).send('server error');
            });
        } else {
            res.status(404).send();
        }
    });
});
