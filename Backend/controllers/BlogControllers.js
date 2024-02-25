const Blog = require("../models/Blog")

const createPost = async(req,resp)=>{
    
    if(!req.user.isAdmin)
    return resp.status(401).json({
    success:false,
    msg:"You are Not alllowed to post because u r not Admin"})

    if(!req.body.title || !req.body.content)
        return resp.status(400).json({
            success:false,
            msg:"Please fields all the necessary fields",
        isAdmin:req.user.isAdmin})
    try{
        const newBlog = await Blog.create({
            ...req.body,slug:"Macho bLOG",
            author:req.user.id
        })
        return resp.status(200).json({
            success:true,
            msg:"Blog Created Successully",
            blog:newBlog
        })
    }
    catch(err)
    {
        return resp.status(400).json({
            success:false,
            msg:"Error while Publishing Blog"  
        })
    }
    
}

module.exports = {createPost}