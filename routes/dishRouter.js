const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

const dboper = require('../utils/operations');
const Dishes = require('../models/dishSchema');
const url = 'mongodb://localhost:27017/';
const connect = mongoose.connect(url);

const dbname = 'conFusion';
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    connect.then((db) => {
        console.log('Connected correctly to server');
        var newDish = Dishes({
            name: 'Uthappizza 2',
            description: 'test'
        });
    
        newDish.save()
            .then((dish) => {
                console.log(dish);
                return Dishes.find({});
            })
            // .then((dishes) => {
            //     console.log(dishes);
            //     return Dishes.remove({});
            // })
            .then(() => {
                return mongoose.connection.close();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter; 