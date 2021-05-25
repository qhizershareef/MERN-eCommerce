import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


//@desc POST order details
//@route POST /api/orders
//@access private
//protected route creates order obj

const addOrderItems = asyncHandler(async (req, res) =>{
    const {
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        shippingAddress,
        paymentMethod
    } = req.body;

    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error('No items in cart!');
        return;
    }else{
        const order = new Order({
            user: req.user._id, 
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            shippingAddress,
            paymentMethod
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404);
        throw new Error('Order Not Found!');
    }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler( async (req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid =true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
            paymentSuccess: true
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not Found');
    }

})

// @desc    Fetch orders to profile
// @route   GET /api/orders/myorders
// @access  Private

const fetchOrders = asyncHandler( async(req,res)=>{
    const orders = await Order.find({user: req.user._id}).sort({updatedAt:-1});
    res.json(orders)
})


// @desc    Fetch All orders to admin
// @route   GET /api/orders/
// @access  Private

const fetchAllOrders = asyncHandler( async(req,res)=>{

    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.countDocuments();

    const orders = await Order.find().populate('user', 'id name').sort({updatedAt:-1}).limit(pageSize).skip(pageSize * (page-1));

    if(orders){
        res.json({orders, page, pages: Math.ceil(count/pageSize)});
    } else{
        res.status(404)
        throw new Error('Order not Found');
    }
})


const updateToDelivered = asyncHandler( async (req,res) =>{

    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Cannot find the order with id:'+req.params.id)
    }
})

export {addOrderItems, getOrderById, updateOrderToPaid, fetchOrders, fetchAllOrders, updateToDelivered}