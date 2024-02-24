const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { use } = require('../routes/authRoutes');


const signinController = async(req,resp)=>{
try{
    const {email,password} = req.body;
    if(!email || !password || email === '' || password === '')
    {
        return resp.status(400).json({
            success:false,
            msg:"All Fields are Required"
        })
    }
    let user = await User.findOne({email})
    if(!user)
    {
        return resp.status(404).json({
            success:false,
            msg:"User Do Not exists"
        })
    }

    const payLoad =
    {
        email:user.email,
        id:user._id

    } 

    if(await bcrypt.compare(password,user.password))
    {
        const token = jwt.sign(payLoad,
                               process.env.JWT_SECRET,
                               {expiresIn:"2h"})
        const {password,...userdata} = user._doc;
        const options={expires: new Date(Date.now() + 2*24*60*60*1000),
                        httpOnly:true,}                       
            resp.cookie("web_token",token,options);
            return resp.status(200).json({
                success:true,
                msg:"SignIn done successfully",
                userdata,
                token                
            })
}

    else{
        return resp.status(400).json({
            success:false,
            msg:"Password Do Not Match"
        })
    }

}
catch(err)
{
    console.error(err)
    resp.status(400).json({
        success:false,
        msg:"Error While Sign In"
    })
}

}




const signupController = async(req,resp)=>{
    try{
        //retrieve data from request body
        const{username,email,password,cnfpassword} = req.body;
        
        //Check Whether all important data is present or not
        if(!username || !email || !password || !cnfpassword||email=='' || username=='' || password == '' || cnfpassword== ' ')
        return resp.status(400).json({success:false,msg:"Fill all the fields"});

        if(password!= cnfpassword)
        return resp.status(400).json({success:false,msg:"Password Do Not Match"});

        
        
        //check whether iF USER alredy EXISTS
        if(await User.findOne({email}))
        {
            return resp.status(400).json({
                success:false,
                message:'User already Exists',
            })
        }
    
        //securing the password by doing hashing of it
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return resp.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }
        try{
        await User.create({
          username,email,password:hashedPassword  
        })
        return resp.status(200).json({
            success:true,
            msg:"User Created SuccessFully"
        })}
        catch(err)
        {
            console.log(err)
            resp.status(500).json({
                success:false,
                msg:"Problem in adding user in model"
            })
        }

    }    
    catch(err)
    {
        console.log(err)
        console.error(err)
        resp.status(400).json({success:false,msg:"Some Error Occured While SignUp"})
    }
}

module.exports = {signinController,signupController}