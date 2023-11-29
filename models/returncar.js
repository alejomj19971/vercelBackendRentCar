const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    returnnumber:String,
    rentnumber: String,
    returndate:Date,
    created:{
        type:Date,
        default: Date.now(),
    }
})



module.exports = mongoose.model('returncars', ProductSchema);