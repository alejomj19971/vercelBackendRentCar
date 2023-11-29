const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    username:String,
    name:String,
    password:String,
    role:String,
    reservword: String,
    created:{
        type:Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('user', ProductSchema);