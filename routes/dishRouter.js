const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbname = 'conFusion';
const Dishes = require('../models/dishSchema');
const url = 'mongodb://localhost:27017/' + dbname;
const connect = mongoose.connect(url);
const dishRouter = express.Router();
const dboper = require('../utils/operations');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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

        Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);
    
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated test'}
            },{ 
                new: true 
            })
            .exec();
        })
        .then((dish) => {
            console.log(dish);
    
            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling!',
                author: 'Leonardo di Carpaccio'
            });
    
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);
    
            return Dishes.remove({});
        })
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