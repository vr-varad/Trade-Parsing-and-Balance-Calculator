const mongoose = require('mongoose');

const {Schema} = mongoose

const csvDataSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    utc_timestamp: {
        type: Date,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: true
    },
    buy_sell_amt: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('csvData', csvDataSchema);

