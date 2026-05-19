const mongoose = require('mongoose');

const connection = async () => {
    return mongoose.connect("mongodb://localhost:27017/users")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB", err);
        });
        // try{
        //     await mongoose.connect("mongodb://localhost:27017/users", {
        //         // useNewUrlParser: true,
        //         // useUnifiedTopology: true,
        //     });
        //     console.log("Connected to MongoDB");
        // }
        // catch (error) {
        //     console.error("Error connecting to MongoDB", error);
        // }
}

module.exports = connection;