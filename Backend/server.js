import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import {errorHandler,errorNotFound  } from "./middleware/errorMiddleware.js";
//optional
import colors from 'colors';
import path from 'path';
import morgan from 'morgan';
// const express = require('express');
// const products = require('./data/products');
// const dotenv = require('dotenv');

dotenv.config()

connectDB()

const app = express();

app.use(express.json()) 


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
  

app.use('/api/products',productRoutes)

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes )

app.use('/api/products',uploadRoutes);

app.get('/api/paypal/client',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve();
if(process.env.NODE_ENV=== 'production'){
    app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

    app.use(express.static(path.join( __dirname, '/ecommerce-react-frontend/build')))
    app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname,'ecommerce-react-frontend','build','index.html')))

}else{
    app.get('/',(req,res)=>{
        res.send('API REQUESTED, not in production')
    })
}
app.use(errorNotFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running in ${process.env.NODE_ENV} and Connected at port:'+ ${PORT}`.cyan.underline)
})
