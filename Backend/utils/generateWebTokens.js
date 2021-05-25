import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JSON_SECRET,{
        expiresIn: '30d' 
    })
}

export {generateToken};