const UserModel = require('../models/User.js')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const signup = async (req,res) =>
{
    try
    {
        const{name,email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(user)
        {
            return res.status(409).json({message:"User already exitsts",success:false});
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:"signed up successfully",success:true} )

    }catch(error)
    {
        res.status(500).json({message:"Internal Server Error",success:false})
        console.log(error)
    }
}
const login = async (req,res) =>
    {
        try
        {
            const{email,password}=req.body;
            const user = await UserModel.findOne({email});
            const errormsg = "Auth failed or password is wrong";
            if(!user)
            {
                return res.status(403).json({message:errormsg,success:false});
            }
            const isPassTrue =  await bcrypt.compare(password,user.password);
            if(!isPassTrue)
            {
                return res.status(403).json({message:errormsg,success:false});
            }
            const jwtToken= jwt.sign(
                {email:user.email,_id:user.id},
                process.env.JWT_SECRET,
                {expiresIn:'24h'}
            )
            res.status(200).json(
                {message:"login  successfully",
                success:true,
                jwtToken,
                email,
                name:user.name
                
                
        })
    
        }catch(error)
        {
            res.status(500).json({message:"Internal Server Error",success:false})
            console.log(error)
        }
    }
    
module.exports = {
    signup,
    login,
}