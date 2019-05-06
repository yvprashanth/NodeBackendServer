const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    }
})

const dishSchema = new Schema({
    name:{
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
})

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes