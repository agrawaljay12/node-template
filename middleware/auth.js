import  jwt from "jsonwebtoken";
import express from "express";
import crypto from "crypto";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

// load the jwt JWT_SECRET_KEY, expire_time
let expire_time  = process.env.ACCESS_TOKEN_EXPIRE_MINUTES;
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
let refresh_token_expire = process.env.REFRESH_TOKEN_EXPIRE_DAYS

// const token = crypto.randomBytes(32).toString('hex');
// console.log(token);

const create_token = (data)=>{
    try{
        
        const token = jwt.sign(data, JWT_SECRET_KEY, {
            expiresIn: expire_time
        })

        return token
    }
    catch(error){
           
        console.log(error);

        throw new Error("Token creation failed");
    }
}

const verifytoken =(req,res,next)=>{
    try{

        const  token = req.headers.authorization;

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

const refresh_token = (data)=>{
    try{
        
        const token = jwt.sign(data, JWT_SECRET_KEY, {
            expiresIn: expire_time
        })

        return token
    }
    catch(error){
           
        console.log(error);

        throw new Error("Token creation failed");
    }
}

export {create_token,verifytoken,refresh_token};
