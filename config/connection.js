import mongoose, { Mongoose } from 'mongoose';

const connection = async () => {
    // return mongoose.connect(process.env.MONGO_URI)
    //     .then(() => {
    //         console.log("Connected to MongoDB");
    //     })
    //     .catch((err) => {
    //         console.error("Error connecting to MongoDB", err);
    //     });
        try{
            await mongoose.connect(process.env.MONGO_URI ,{
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            console.log(process.env.MONGO_URI)
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Error connecting to MongoDB", error);
        }
}

export default connection;