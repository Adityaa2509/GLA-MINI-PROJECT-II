const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const updateUser = async (req, resp) => {
    console.log(req.user.id);
    console.log(req.params.userId);

    if (req.user.id !== req.params.userId) {
        return resp.status(403).json({
            success: false,
            msg: "You are not allowed to update this user"
        });
    }

    try {
        let updateFields = {};

        if (req.body.password) {
            // Hash the password and update the field
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateFields.password = hashedPassword;
        }

        if (req.body.username) {
            if (req.body.username.length < 6 || req.body.username.length > 20)
                return resp.status(400).json({
                    success: false,
                    msg: "Username length is not in range"
                });

            if (req.body.username.includes(' '))
                return resp.status(400).json({
                    success: false,
                    msg: "Username cannot contain space"
                });

            updateFields.username = req.body.username;
        }


        if (req.body.pic) {
            updateFields.pic = req.body.pic;
        }

        const user = await User.findByIdAndUpdate(req.params.userId, {
            $set: updateFields
        }, {
            new: true
        });

        const {
            password,
            ...info
        } = user._doc;

        return resp.status(200).json({
            success: true,
            msg: "User Updated Successfully",
            user:info
        });
    } catch (err) {
        console.log(err);
        return resp.status(400).json({
            success: false,
            msg: "Error in updating user",
            error: err
        });
    }
}

const deleteUser = async(req,resp)=>{
    console.log(req.user.id);
    console.log(req.params.userId);

    if(req.user.id !== req.params.userId)
    {
        return resp.status(403).json({
            success:false,
            msg:"You are Not Allowed to delete another user"
        })
    }
    try{
            
        await User.findByIdAndDelete(req.params.userId)
        return resp.status(200).json({
        success:true,
        msg:"User Deleted Successfulllly"
    })
        }
    catch(err)
    {
        return resp.status(400).json({
            success:false,
            msg:"Error While deleting the user",
            error:err

        })
    }
}

const getUser = async(req,resp)=>{
    try{
        const user = await User.findById(req.params.userId)
        if(!user)
        return resp.status(404).json({
            success:false,
            msg:"User Not Found"                
        })
        const{password,...userinfo} = user._doc
        return resp.status(200).json(userinfo)
    }
    catch(err)
    {
        return resp.status(400).json({
            success:false,
            msg:"Error while getting USER DETAIL "                
        })
    }
}


module.exports = {updateUser, deleteUser, getUser};
