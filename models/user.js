const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'csvData'
    }],
}, {timestamps: true});


module.exports = mongoose.model('user', userSchema);