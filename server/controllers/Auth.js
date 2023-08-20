const express = require("express");
const User = require("../models/User");

exports.signup = async(req, res) => {
    try{

        const {firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password)
        {
            return res.status(403).json({
                success : false,
                message : "Please fill all details"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success : false,
                message : "User already exits!"
            })
        }

        const user = await User.create({
            firstName, lastName, email, password
        });

        return res.status(200).json({
            success : true,
            user,
            message : "User registered Successfully"
        });
        
        
    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered, please try again!"
        });
    }
}