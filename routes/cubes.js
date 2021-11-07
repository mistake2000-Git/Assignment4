const express = require('express');
const router = express.Router();
const cube = require('../model/cube')


router.get('/',async(req,res)=>{
    try{
        const cubes = await cube.find();
        res.json(cubes);
    }
    catch(err){
        res.send('Error'+err);
    }
})


module.exports = router