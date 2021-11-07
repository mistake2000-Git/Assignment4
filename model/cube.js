const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require: true
    },
    quantity:{
        type:Number,
        require: true,
        default:0
    },
    price:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('cube',cubeSchema)