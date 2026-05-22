import  jwt from "jsonwebtoken";
import express from "express";
// import {handlelogin} from "../controller/user.js"

const app = express();

// load the jwt JWT_SECRET_KEY, expire_time
let expire_time  = process.env.ACCESS_TOKEN_EXPIRE_MINUTES;
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const create_token = (user)=>{
    try{
        
        let payload = {
            id:user._id,
            name:user.name,
            email:user.email
        };
        
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: expire_time
        })

        return token
    }
    catch(error){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

const verifytoken =(req,res,next)=>{
    try{

        const  token = req.header.authorization;

        if(!token || !token.startsWith("Bearer")){
            return res.status(401).json({error:"Acess denied || Invalid token"})
        }

        const decode_token = jwt.verify(token,JWT_SECRET_KEY);

        if(!decode_token){
            return res.status(401).json({error:"Invalid token"})
        }

        req.user = decode_token;

        next();
        
    }catch(error){
        return res.status(500).json({error:"Internal Server Error"});
    }

}

export {create_token,verifytoken};
