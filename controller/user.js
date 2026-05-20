import user from '../models/user.js';

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
        const user = await user.findByIdAndDelete(id);
        return res.json({message: "User deleted successfully", user});
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
// create user 
const handleCreateUser = async (req,res)=>{
    const body = req.body;
    if(!body.name || !body.email || !body.age){
        return res.status(400).json({error: "all fields are required"});
    }
    try{
        const result = await user.create({
            name: body.name,
            email: body.email,
            age: body.age
    
        });
        console.log(result);
        return res.status(201).json({"User created successfully": result}); 
    }
    catch(error){
        return res.status(500).json({ error: "Internal Server Error" });

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
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }   
}
export{handleGetAllUsers ,handleDeleteUserById,handleCreateUser ,handleUpdateUserById,handleGetUserById};