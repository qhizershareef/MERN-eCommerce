import mongoose from 'mongoose';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import users from './data/users.js';
import colors from 'colors';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //inserting users from temp users.js
        //since we are passing one object element as admin under productSchema we need to get the
        //admin from insertMany users which is a promise will return an array of users
        const insertedUsers= await User.insertMany(users)
        // console.log(insertedUsers)
        const adminUser= insertedUsers[0]._id;//since isAdmin=1

        const sampleProducts = products.map(product=>{
            return {...product,user:adminUser}
        })
        // console.log(sampleProducts)
        await Product.insertMany(sampleProducts)
        //console.log('inserted successfully!'.green.underline)
        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const exportData= async() =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('data destroyed!'.red.bold.underline)
        process.exit()
    }
    catch(error){
        console.error(error+' check console'.red.bold)
        process.exit(1)
    }
}

//console.log(process.argv.length+' is the length of arguments from console.'.yellow.bold);
if(process.argv[2]==='-d'){
    importData();
}
else{
    exportData()
}