const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    platenumber:String,
    brand:String,
    state:Boolean,
    dailyvalue:Number,
    created:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('car', ProductSchema);
