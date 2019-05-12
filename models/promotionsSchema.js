const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions