const mongoose=require("mongoose");
require("dotenv").config();

const connect=async ()=>{
    try{
        mongoose.connect(process.env.MONGDB_URL)
        .then(console.log("connectec successfully"));
    }catch(error){
        console.log("Connection issues whill connection with DB");
        console.error(error);
        process.exit(1);
    }
}

connect();

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        // minLength:3,
        // maxLenght:10,
    },
    password:{
        type:String,
        required:true,
        // minLength:6,
    },
    firstName:{
        type:String,
        required:true,
        // maxLenght:50,
    },
    lastName:{
        type:String,
        required:true,
        // maxLenght:50,
    },
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
})

const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountSchema);

module.exports={
    User,   
    Account
}

