const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    rentnumber:String,
    username:String,
    platenumber:String,
    initialdate:Date,
    finaldate: Date,
    status:{ type:Boolean,
    default:true}
 
})

module.exports = mongoose.model('rent', ProductSchema);