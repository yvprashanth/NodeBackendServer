const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
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
    MongoClient.connect(url, (err, client) => {
        assert.equal(err,null);
        console.log('Connected correctly to server');
        const db = client.db(dbname);
        const collection = db.collection("dishes");

        collection.insertOne({"name": "Prashanth Pizza", "description": "test"},
        (err, result) => {
            assert.equal(err,null);
            console.log("After Insert:\n");
            console.log(result.ops);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err,null);
                console.log("Found:\n");
                console.log(docs);
            });
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