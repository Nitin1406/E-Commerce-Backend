const mongoose= require("mongoose");

exports.dbConnect= ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connection with DB is Successful");
    })
    .catch((err)=>{
        console.log("connection with Db is failed");
        console.error(err);
        process.exit(1);
    });
}