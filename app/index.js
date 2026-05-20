import express from "express";
const app = express();
import connection from '../config/connection.js';
import router from "../routes/index.js"
import cors from "cors";

// connnection to mongodb
connection();

//middleware 
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(morgan("dev"))

// register routes of application
router(app);

export default app;