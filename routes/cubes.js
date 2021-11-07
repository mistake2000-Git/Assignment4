const express = require('express');
const router = express.Router();
const cube = require('../model/cube')

//Get all product Rubik
router.get('/',async(req,res)=>{
    try{
        const cubes = await cube.find();
        res.json(cubes);
    }
    catch(err){
        res.send('Error'+err);
    }
})

//Get one product by ID
router.get('/:id',async(req,res)=>{
    try{
        const Cube = await cube.findById(req.params.id);
        res.json(Cube);
    }
    catch(err){
        res.send('Error'+err);
    }
})


//Add new product   
router.post('/',async(req,res)=>{
    const Cube = new cube ({
        category: req.body.category,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    })

    try 
    {
        const c1 = await Cube.save()
        res.json(c1)
    }catch(err)
    {
        res.send('Error')
    }
})

router.patch('/:id/:quantity',async(req,res)=>{
    try
    {
        const Cube = await cube.findById(req.params.id)
        Cube.quantity = req.params.quantity
        const c1 = await Cube.save()
        res.json(c1)
    }
    catch (err)
    {
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try
    {
        await cube.findByIdAndDelete(req.params.id)
        const Cube = await cube.find()
        res.json(Cube)
    }
    catch(err)
    {
        res.send('Error')
    }
})

module.exports = router