const jwt = require('jsonwebtoken')

const Auth = async(req,resp,next)=>{
   try{
    const token = req.cookies.web_token
    if(!token)
    return resp.status(401).json({success:false,msg:"Unauthorized A ccess"})
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        next();
    }
    catch(err)
    {
        return resp.status(401).json({
            success:false,
            message:"Token is Invalid"
        })
    }

}
catch(err)
{
    return resp.status(400).json({
        success:false,
        message:"Something Went Wrong"
    })
} 

}
module.exports = Auth;