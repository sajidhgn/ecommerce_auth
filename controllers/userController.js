
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


const registerUser =  asyncHandler(async(req, res) => {
    console.log('req.body==>',req.body)
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please provide all fields');

    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already exist');
    }

    const hashPassword = await bcrypt.hash(password, 10);
     const user = await User.create({
        username,
        email,
        password: hashPassword,
    })

    if(user){
        res.status(201).json({
           user:{
            _id:user.id,
            username:user.username,
            email:user.email,
           },
           message:'User created successfully'
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }

})

const loginUser=  asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please provide all fields');

    }
    const user= await User.findOne({email});
    if (!user) {
        res.status(401);
        throw new Error('Invalid user data');
    }
    console.log('user==>',user)
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log('comparePassword==>',comparePassword)
    if(user && comparePassword){
        const accesToken = jwt.sign({
            user:{
                _id:user.id,
                username:user.username,
                email:user.email,
            }
        }
        ,process.env.JWT_SECRET,{
            expiresIn:'10m',
            })
        res.status(200).json({accesToken,message:'User login successfully'})
    }
    else{
        res.status(401);
        throw new Error('Invalid user data');
    }
})

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
})

const logoutUser=  asyncHandler(async(req, res) => {
    res.json({message: 'user logout successfully'});
})

module.exports = {registerUser, loginUser, currentUser, logoutUser};