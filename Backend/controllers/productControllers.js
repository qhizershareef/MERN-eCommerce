import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler( async (req, res) => {

        const pageSize = 100;
        const page = Number(req.query.pageNumber) || 1;

        //get the query's value
        const keyword = req.query.keyword ? {
            name:{
                $regex: req.query.keyword, 
                $options: 'i' //options,
            }
        }:{};

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));

        res.json({products, page, pages: Math.ceil(count/pageSize)});
    }
)

const getProductById = asyncHandler( async ( req, res)  => {
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
            res.status(404)
            throw new Error('Product not found!')
        }
    }
);


//@ desc DELETE products
//@ route DELETE /api/products/admin/:id
//@ access private
//@ protect middleware and admin middleware
const deleteProduct = asyncHandler( async ( req, res)=>{

    const deletedProduct = await Product.deleteOne({_id: req.params.id});
    if(deletedProduct){
        res.status(202).json(`User deleted id: ${req.params.id}`);
    }
    else{
        res.status(404);
        throw new Error('User Not Found!!');
    }

})


//@ desc CREATE products
//@ route CREATE /api/products/
//@ access private
//@ protect middleware and admin middleware

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct);

})

// //@desc CREATE products
// //@route CREATE /api/products/admin
// //@access private
// //@protect middleware and admin middleware
const createNewProduct = asyncHandler( async (req,res) =>{
    const {
        name,price,description,image, brand, category, countInStock
    } = req.body;
    const user = req.user._id;
    if(name && price && description && user && image && category && countInStock){
        const product = new Product({
            name,price,user,description,image, brand, category, countInStock
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct);
    }else{
        res.status(404).json('Error/ Insufficient fields')
    }
})



// //@desc UPDATE users
// //@route UPDATE /api/products/admin/:id
// //@access private
// //@protect middleware and admin middleware
const updateProduct = asyncHandler(async ( req, res ) =>{
    const {
        name,price, image, brand, category, countInStock, description
    } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.description = description || product.description;
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else{

        res.status(404);
        throw new Error('this product does not exist!');
    
    }

})

// //@desc UPDATE product stock-count after successful purchase
// //@route UPDATE /api/products/:id
// //@access private
// //@protect middleware
const updateStockCount = asyncHandler(async ( req, res ) =>{

    const {
        qty
    } = req.body;

    const product = await Product.findById(req.params.id);
    if(qty){
        product.countInStock = product.countInStock-qty;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else if(!product){
        res.status(404);
        throw new Error('this product does not exist!');
    } else{
        res.status(404);
        throw new Error('this Order Does not have any quantity!');
    }

})

// //@desc ADD reviews
// //@route POST /api/products/:id/review
// //@access private
// //@protect middleware 
const createReview = asyncHandler(async ( req, res ) =>{
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if(product){
        const reviewExists = product.reviews.find((revs)=> revs.user.toString()===req.user._id.toString())
        if(reviewExists){
            res.status(400);
            throw new Error('Product Already Reviewed!');
        }
        //else part
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,itm)=>itm.rating+ acc,0) / product.reviews.length;

        await product.save();

        res.status(201).json({message:'Review saved!'});
    } else{

        res.status(404);
        throw new Error('This product does not exist!');
    
    }

})


// //@desc GET Latest products
// //@route GET /api/products/top
// //@access public

const getTopProducts = asyncHandler( async (req, res) => {

    const products = await Product.find({}).sort({rating:-1}).limit(4)
        if(products){
            res.json(products);
        }else{
            res.status(404);
            throw new Error('No products found!')
        }
    }
)
export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createNewProduct, updateStockCount, createReview, getTopProducts}