var express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('WandeRO','mirandal','',{
    dialect: 'mysql',
    port:15454
});

var app = express();
app.use(bodyParser.json());
app.use(cors());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));
app.use('/admin',express.static('admin'));


var Region = sequelize.define('Regions', {
   
    name: {
        type:Sequelize.STRING,
        field:'name'
    },
    description: {
        type:Sequelize.STRING,
        field:'description'
    }
}, {
    timestamps:false

});

var City = sequelize.define('Cities',{
    name:{
        type: Sequelize.STRING,
        field:'name'
    },
    description:{
        type:Sequelize.STRING,
        field:'description'
    },
    photo:{
        type:Sequelize.UUID,
        field:'photo'
    },
    id_region:{
        type:Sequelize.INTEGER,
        field:'id_region'
    }
}, {
    timestamps:false
});

// app.post('/regions', function(req,res) {
//     Region.create(req.body).then(function(region) {
//         Region.findById(region.id).then(function(region) {
//             res.status(201).send(region);
//         });
//     });
// });

app.get('/cities',function(request, response) {
    City.findAll().then(function(cities){
        response.status(200).send(cities);
    });
});

app.get('/regions', function(request,response){
    //Region.findAll().then(function(regions){
        response.status(200).send({name:"Transylvania", description:"Transylvania is home to some of Europe's best-preserved medieval towns, most notably Brasov, featuring Old Saxon architecture and citadel ruins."});
    //});
});

// app.post('/destinations',function(req,res){
//     City.create(req.body).then(function(city){
//         City.findById(city.id).then(function(city){
//             res.status(201).send(city);
//         });
//     });
// });

// app.post('/regions',function(req,res){
//     Region.create(req.body).then(function(region){
//         Region.findById(region.id).then(function(region){
//             res.status(201).send(region);
//         });
//     });
// });

app.listen(process.env.PORT);