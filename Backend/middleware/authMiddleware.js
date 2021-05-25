
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler( async (req, res, next) => {
    let token;
    const authVal = req.headers.authorization;
    if(authVal && authVal.startsWith('Bearer')){
        try {
            console.log('Token Found!'+' the current request api is' , req.headers)
            token = authVal.split(' ')[1];
            console.log(token)
            const decoded = jwt.verify(token, process.env.JSON_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user);
            next()   
        } catch (error) {
            console.error(error);
            res.status(401);    
            throw new Error('Not Authorized, invalid Token!')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not Authorized, No Token!')
    }
})

const admin = asyncHandler( async ( req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('You Are not Authorized, requires admin access!')
    }
})

export {protect, admin};