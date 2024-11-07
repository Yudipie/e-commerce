const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../model/authModel')

const registerUser = asyncHandler(async(req,res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('user already registered');
    }

    const hashpwd = await bcrypt.hash(password,10);

    const user = await User.create({
        username:username,
        email:email,
        password:hashpwd
    })
    console.log('user created',user);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
      } else {
        res.status(400);
        throw new Error("User data is not valid");
      }
      res.json({ message: "Registered the user" });

})

const loginUser = asyncHandler(async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable && (await bcrypt.compare(password, userAvailable.password))){
        const accessToken = jwt.sign({
            user:{
                username: userAvailable.username,
                email: userAvailable.email,
                password: userAvailable.password
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
    );
    res.status(201).json({"accessToken":accessToken,message: "login successful"})
    }
    else {
        res.status(400).json( "email or password is wrong");
    }

    res.status(500).json("internal server error")
})


const checkUser = asyncHandler(async(req,res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
          res.json({ exists: true });
        } else {
          res.json({ exists: false });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }

})

module.exports = {registerUser,loginUser,checkUser}