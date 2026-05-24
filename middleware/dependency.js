import { error } from "console";
import {verifytoken} from "./auth.js";


// const get_current_user =(req,res,next)=>{

//     try{
//         const token = req.headers.authorization.startsWith("Bearer");

//         const current_user = verifytoken(token);

//         if(!current_user){
//             return res.status(401).json({error:"Invalid or Missing token"});
//         }

//         return res.send(current_user)

//         next();

//     }catch(error){
//          return res.status(500).json({error:"Internal Server Error"});
//     }
// }

// const get_required_roles = (roles=[])=>{
    
//    const check_role =(req,res,next)=>{

//         try{
//             const token = req.headers.authorization.startsWith("Bearer");

//             if(!token){
//                 return res.status(401).json({error:"Access denied"});
//             }

//             const current_user = verifytoken(token);

//             if(!current_user){
//                 return res.status(403).json({error:"Invalid or Missing token"});
//             }

//             if(roles.includes(current_user.role)){
//                 next();
//             }else{
//                 return res.status(401).json({error:"Unauthorized to Acess"})
//             }

//         }catch(error){
//             return res.status(500).json({error:"Internal Server Error"});
//         }
//     } 
//     return check_role;
// }

const get_required_roles = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
};

export default get_required_roles;