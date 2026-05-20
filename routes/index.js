// register the all routes  of application 
import userrouter from "./version/user";

const registerroutes = (app) =>{

    // http://localhost:5000/api/v1/auth/
    app.use("/api/v1/auth",userrouter)
} 

module.exports = registerroutes
