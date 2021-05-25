import User from '../models/userModel.js';
import asyncHandler  from 'express-async-handler';
import { generateToken } from '../utils/generateWebTokens.js';
import bcrypt from 'bcryptjs';
import { raw } from 'express';

// @desc Auth User and get Token(json)
// @route  POST /api/users/login
// @access public

const authUser = asyncHandler( async ( req, res ) => {
    console.log("hello")

    const { email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        console.log(user)
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error('Credentials are invalid!')
    }
})

// @desc GET user profile
// @route  GET /api/users/profile
// @access private
// will use tokens to access

const getUserProfile = asyncHandler(async ( req, res ) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    // res.json(req.user);
})

//@desc POST user details
//@route POST /api/users
//@access public
//will generate tokens on success

const registerUser = asyncHandler ( async (req, res)=>{

    let {name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists!');
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({name,email,password})

    if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else{
        res.status(400);
        res.json('Invalid User Data!');
    }

})

//@desc UPDATE user details
//@route PUT /api/users/profile
//@access private
//will verify tokens before updation

const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        console.log(user)
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            user.password = password;
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404);
        throw new Error('User Not Found!!');
    }
})


//@desc GET users
//@route GET /api/users/
//@access private
//@protect middleware and admin middleware
const getUsers = asyncHandler( async (req, res)=>{
    const users = await User.find()
    if(users){
        res.status(200).json(users)
    }
    else{
        res.status(404);
        throw new Error('User Not Found!!');
    }

})

//@desc GET user
//@route GET /api/users/
//@access private
//@protect middleware 

const getUser = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404);
        throw new Error('User Not Found!!');
    }

})


//@desc DELETE users
//@route DELETE /api/users/admin/:id
//@access private
//@protect middleware and admin middleware
const deleteUser = asyncHandler( async ( req, res)=>{
    const deletedUser = await User.deleteOne({_id: req.params.id});
    if(deletedUser){
        res.status(202).json(`User deleted id: ${req.params.id}`);
    }
    else{
        res.status(404);
        throw new Error('User Not Found!!');
    }

})

//@desc UPDATE users
//@route UPDATE /api/users/admin/:id
//@access private
//@protect middleware and admin middleware
const updateUser = asyncHandler( async (req,res)=>{

    const user = await User.findById(req.params.id);
    if(user){
        console.log('user',user)
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || false;

        const updatedUser = await user.save();
        res.status(201);
        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(400);
        throw new Error('User Does not exist')
    }
    
})

export { authUser, getUserProfile, registerUser , updateUserProfile, getUsers, deleteUser, getUser, updateUser};