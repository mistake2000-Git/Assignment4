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
        res.send('The list of product is empty!');
    }
})

//Get one product by ID
router.get('/:id',async(req,res)=>{
    try{
        const Cube = await cube.findById(req.params.id);
        res.json(Cube);
    }
    catch(err){
        res.send('The product does not exist');
    }
})


//Add new product   
router.post('/',async(req,res)=>{
   
    try 
    {
        const temp= await cube.findOne({name: req.body.name})
        if(temp)
        {
            throw new Error('asdf')
        }
        else{
            const Cube = new cube ({
                category: req.body.category,
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price
            })
            const c1 = await Cube.save()
            res.json(c1)
        }
    }catch(err)
    {
        res.send('The product name is exist')
    }
   
})

router.patch('/:id/:quantity',async(req,res)=>{
    try
    {
            if(req.params.quantity < 0)
            {
                throw new Error()
            }
            const Cube = await cube.findById(req.params.id)
            Cube.quantity = req.params.quantity
            const c1 = await Cube.save()
            res.json(c1)
    }
    catch (err)
    {
        res.send('Does not exist the product or the quantity is less than 0')
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
        res.send('Doest not exist the product to delete')
    }
})

module.exports = router



/**
 * @api {get} /cubes Request query all product
 * @apiDescription This api will return all product in the rubik shop
 * @apiName GetProduct
 * @apiGroup RubikShop
 *
 * @apiSuccess {String} ID id of the product.
 * @apiSuccess {String} Category name  of product.
 * @apiSuccess {String} Name name  of product.
 * @apiSuccess {Int} Quantity quantity  of product.
 * @apiSuccess {Int} Price price  of product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [
        {
            "_id": "6187fe2fa2241ed2e1359b26",
            "category": "3x3",
            "name": "Rubik Moyu Weilong WR M 2020",
            "quantity": 40,
            "price": 650000,
            "__v": 0
        },
        {
            "_id": "6187fe4da2241ed2e1359b28",
            "category": "3x3",
            "name": "Rubik YJ MGC 3x3 V2 M Stickerless",
            "quantity": 70,
            "price": 290000,
            "__v": 0
        },
        {
            "_id": "6187fe99a2241ed2e1359b2b",
            "category": "4x4",
            "name": "Rubik 4x4 Gan 460M Stickerless",
            "quantity": 10,
            "price": 990000,
            "__v": 0
        }
      ]
 * @apiError (404) ProductsNotFound List of product is Empty!
 * @apiErrorExample Error-Response:
 *     The products list is empty!
 *
 * @apiSampleRequest https://assignment4tanloc.herokuapp.com/cubes
 * 
 */


      /**
 * @api {get} /cubes/:id Request query specific product
 * @apiDescription This api will return the product with id input in!
 * @apiName GetSpecificProduct
 * @apiGroup RubikShop
 *
 * @apiSuccess {String} ID id of the product.
 * @apiSuccess {String} Category name  of product.
 * @apiSuccess {String} Name name  of product.
 * @apiSuccess {Int} Quantity quantity  of product.
 * @apiSuccess {Int} Price price  of product
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
           {
                "_id": "6187fe2fa2241ed2e1359b26",
                "category": "3x3",
                "name": "Rubik Moyu Weilong WR M 2020",
                "quantity": 40,
                "price": 650000,
                "__v": 0
            }
        ]
 * @apiError (404) ProductNotFound There are no product with the id!
 * @apiErrorExample Error-Response:
 *     The product not found!
 * @apiQuery {string} [id] The id of the specific city
 * @apiSampleRequest https://assignment4tanloc.herokuapp.com/cubes/:id
 */


/**
 * @api {post} /cubes/ Add a new Product
 * @apiDescription This api will add a new product to the Products List!
 * @apiName AddNewProduct
 * @apiGroup RubikShop
 *
 * @apiSuccess {String} ID id of the product.
 * @apiSuccess {String} Category name  of product.
 * @apiSuccess {String} Name name  of product.
 * @apiSuccess {Int} Quantity quantity  of product.
 * @apiSuccess {Int} Price price  of product
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [
            {
                "_id": "6187fe2fa2241ed2e1359b26",
                "category": "3x3",
                "name": "Rubik Moyu Weilong WR M 2020",
                "quantity": 40,
                "price": 650000,
                "__v": 0
            }
        ]
 * @apiError (404) TheProductExist The new product is exist!
 * @apiErrorExample Error-Response:
 *     The product name is exist!
 * @apiBody {string} [id] The id of the new product
 * @apiBody {string} [category] The category of the new product
 * @apiBody {string} [name] The name of the new product
 * @apiBody {int} [quantity] The quantity of the new product
 * @apiBody {int} [price] The name of the new product
 * @apiSampleRequest https://assignment4tanloc.herokuapp.com/cubes/
 */


/**
 * @api {patch} /api/ Update the quantity of the product
 * @apiDescription This api will update the quantity of the product with ID input!
 * @apiName UpdateProduct
 * @apiGroup RubikShop
 *
 * @apiSuccess {String} ID id of the product.
 * @apiSuccess {String} Category name  of product.
 * @apiSuccess {String} Name name  of product.
 * @apiSuccess {Int} Quantity quantity  of product.
 * @apiSuccess {Int} Price price  of product
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [
            {
                "_id": "6187fe2fa2241ed2e1359b26",
                "category": "3x3",
                "name": "Rubik Moyu Weilong WR M 2020",
                "quantity": 20,
                "price": 650000,
                "__v": 0
            }
        ]
 * @apiError (404) Theidunvalid The id to update doest not exist!
 * @apiError (404) The quantity is less than 0!
 * @apiErrorExample Error-Response:
 *     Can't not found the product ID or the quantity is less than 0!
 * @apiQuery {string} [id] The id of the specific product
 * @apiQuery {int} [quantity] The quantity of the specific product
 * @apiSampleRequest https://assignment4tanloc.herokuapp.com/cubes/:id/:quantity
 */


/**
 * @api {delete} /cubes/ Delete the product with the ID input!
 * @apiDescription This api will delete the product of the id input.
 * @apiName DeleteProduct
 * @apiGroup RubikShop
 *
 * @apiSuccess {String} ID id of the product.
 * @apiSuccess {String} Category name  of product.
 * @apiSuccess {String} Name name  of product.
 * @apiSuccess {Int} Quantity quantity  of product.
 * @apiSuccess {Int} Price price  of product
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   [
        {
            "_id": "6187fe2fa2241ed2e1359b26",
            "category": "3x3",
            "name": "Rubik Moyu Weilong WR M 2020",
            "quantity": 20,
            "price": 650000,
            "__v": 0
        },
        {
            "_id": "6187fe4da2241ed2e1359b28",
            "category": "3x3",
            "name": "Rubik YJ MGC 3x3 V2 M Stickerless",
            "quantity": 70,
            "price": 290000,
            "__v": 0
        },
        {
            "_id": "6187fe99a2241ed2e1359b2b",
            "category": "4x4",
            "name": "Rubik 4x4 Gan 460M Stickerless",
            "quantity": 10,
            "price": 990000,
            "__v": 0
        }
    ]
 * @apiError (404) CannotFindTheProduct The id of the product to delete does not exist.
 * @apiErrorExample Error-Response:
 *    No exist the product to delete!
 * @apiQuery {string} [id] The id of the specific product
 * @apiSampleRequest  https://assignment4tanloc.herokuapp.com/cubes/:id/
 */