const User= require("../models/user.model");

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const signUpController = async(req, res) => {
  try {


    
    const { firstName, lastName, email, password } = req.body;
    


    //validation

    if(!firstName || !lastName ||!email || !password){
        return res.status(500).json({message:"All fields are required"})
    }


    // if user already exists

    const existUser = await User.findOne({ email})
    if(existUser){
      return res.status(400).json({ message:"Email already exists"})

    }


    // Create a new user instance
    const newUser = new User({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    });

    // Save the user to the database
    await newUser.save();
    console.log("THIS IS THE NEW USER"+newUser)

    // Respond with a success message
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};


const signInController = async(req,res)=>{
    try{
       const {email, password} = req.body;
       // check if the user already exists
       const user = await User.findOne({email})
       if(!user){
       return res.status(404).json({message:"User does not exist"})
       }

       const isPasswordValid = await bcrypt.compare(password, user.password);
       if (!isPasswordValid) {
         return res.status(400).json({ message: "Invalid password" });
       }

       const token = jwt.sign({id:user._id},"jwtsecret",{
        expiresIn:"10d"
       })
       res.status(200).json({user , token});
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
      }

   }

   const getUserProfile = async(req, res) =>{
    try{
      const userId= req.query.id
      const user = await User.findById(userId);
      if(!user){
        return res.status(400).json({message:"User not found"})
      }
      user.password=undefined
      res.status(200).json({user})
    }
    catch(error){
      res.status(400).json({message:"internal server error"})
    }

   }

  

module.exports = {
  signUpController,
  signInController,
  getUserProfile
};
