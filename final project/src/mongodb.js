const mongoose=require("mongoose")

const connect  = mongoose.connect("mongodb://localhost:27017/ConnectedUsers")


connect.then(()=>{
    console.log('connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model('users',logInSchema)

module.exports= collection;