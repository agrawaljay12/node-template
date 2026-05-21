import user from '../models/user.js';
import bcrypt from "bcrypt";

// get all users
const handleGetAllUsers = async (req, res) => {
    try {
        const users = await user.find({});
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
// delete user by id
const handleDeleteUserById = async(req,res) =>{
    try{
        const id = req.params.id;

        if (!id){
            return res.status(400).json({error:"User Id is required"});
        }
        const existuser = await user.findOne({"_id":id});

        if(!existuser){
           return res.status(400).json({error:"User is not found"});
        }

        const result  = await user.findByIdAndDelete(id);

        return res.json({message: "User deleted successfully", result});
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
// create user 
const handleCreateUser = async (req,res)=>{   
    try{

        const body = req.body;

        // validation to all required field
        if(!body.name || !body.email || !body.age || !body.password){
            return res.status(400).json({error: "all fields are required"});
        }   

        // check the already email exist or not
        const exist_user = await user.findOne({"email":body.email});
        
        if (exist_user){
            return res.status(400).json({error:"Email already exist please try new one"})
        } 

        const hash_password = await bcrypt.hash(body.password,10);

        const result = await user.create({
            name: body.name,
            email: body.email,
            age: body.age,
            password:hash_password,
            role:"user"
    
        });
        return res.status(201).json({"User created successfully": result}); 
    }
    catch(error){
        return res.status(500).json({ error: "Internal Server Error" });

    }
}

// handle login
const handlelogin = async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"all field are required"});
        }

        const existuser = await user.findOne({"email":email});

        if(!existuser){
            return res.status(404).json({error:"User not found"});
        }

        const hash_password = await bcrypt.compare(password, existuser.password);

        if(!hash_password){
            return res.status(401).json({error:"password is not match with hash password"});
        }

        const result = {
            id: existuser._id,
            name:existuser.name,
            email:existuser.email,
            age: existuser.age
        }

        return res.status(200).json({
            message:"user logged in",
            data:result
        });

    }catch{
        return res.status(500).json({error:"Internal Server Error"});
    }
}

// update user by id
const handleUpdateUserById = async (req,res) =>{
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({message: "User updated successfully", user});
  }   
  catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// get particular user by id
const handleGetUserById = async (req,res) =>{
    try{
        const id = req.params.id;

        if(!id){
             return res.status(400).json({error:"User Id is required"});
        }

        const result  = await user.findById({_id:id}); 

        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            message:"user is fetched",
            data:result
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }   
}
export{handleGetAllUsers ,handleDeleteUserById,handleCreateUser ,handleUpdateUserById,handleGetUserById, handlelogin};