var mongoose = require('mongoose');


const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true
        });
        console.log("MongoDB connected...", connect.connection.host, connect.connection.name);
    }catch (error){
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;