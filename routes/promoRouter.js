const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

const mongoose = require('mongoose');
const dbname = 'conFusion';
const Promotions = require('../models/promotionsSchema');
const url = 'mongodb://localhost:27017/' + dbname;
const connect = mongoose.connect(url);

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    connect.then((db) => {
        Promotions.find({})
        .then((promotions) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions)
        }, (err) => next(err))
        .catch((err) => next(err));
    })
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
  res.write('Updating the promotion: ' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;