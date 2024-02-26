const Blog = require("../models/Blog");

const createPost = async (req, resp) => {
    if (!req.user.isAdmin)
        return resp.status(401).json({
            success: false,
            msg: "You are Not allowed to post because you are not Admin"
        });

    if (!req.body.title || !req.body.content)
        return resp.status(400).json({
            success: false,
            msg: "Please fill all the necessary fields",
            isAdmin: req.user.isAdmin
        });

    try {
        
        const newBlog = await Blog.create({
            ...req.body,
            slug: `Macho bLOG `,
            author: req.user.id
        });

        return resp.status(200).json({
            success: true,
            msg: "Blog Created Successfully",
            blog: newBlog
        });
    } catch (err) {
        console.error("Error while creating blog:", err);
        return resp.status(400).json({
            success: false,
            msg: "Error while Publishing Blog"
        });
    }
};


const updatePost = async (req, resp) => {
    if (!req.user.isAdmin)
        return resp.status(401).json({
            success: false,
            msg: "You are not Allowed to update Blog because you are not Admin"
        });

    const { id } = req.params; // Extract id from req.params

    try {
        // Check if the blog exists
        const existBlog = await Blog.findById(id);
        if (!existBlog) {
            return resp.status(400).json({
                success: false,
                msg: "Blog with this id does not exist"
            });
        }

        // Use $set to update specific fields without replacing the entire document
        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        return resp.status(200).json({
            success: true,
            msg: "Blog Updated Successfully",
            Blog: updatedBlog
        });
    } catch (err) {
        return resp.status(400).json({
            success: false,
            msg: "Error while Updating Blog By Admin"
        });
    }
};


const deletePost = async(req,resp)=>{
    if(!req.user.isAdmin)
    return resp.status(403).json({
    msg:"You are Not Allowed to Delete This Blog",
    success:false})
        try{
            const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
            if(!deleteBlog)
            return resp.status(400).json({
        success:false,
        msg:"Such Blog do not exist"})
        return resp.status(200).json({
            success:true,
            msg:"Blog Deleted Successfully"
        })
        }
        catch(err)
        {
            return resp.status(400).json({
                success:false,
                msg:"Error while Deleting The Blog"
            })
        }
}   


module.exports = { createPost, updatePost, deletePost};
