// register the all routes  of application 
import userrouter from "./version/v1/user.js";

const registerroutes = (app) =>{

    // http://localhost:5000/api/v1/auth/
    app.use("/api/v1/auth",userrouter)
} 

export default registerroutes;
