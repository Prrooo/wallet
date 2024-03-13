const express=require("express");

const mongoose=require("mongoose");
const {User,Account}=require("./db");
const zod=require("zod");
const router = express.Router();
const jwt= require("jsonwebtoken");
const {JWT_SECRET}=require('../config');
const {authMiddleware}=require('../middleware');


router.get('/me',authMiddleware,async (req,res)=>{
    const userId=req.userId;
    
    if(!userId){
        return res.status(403).json({
            message:"not logged in"
        });
    }
    const userDetails=await User.findOne({_id:userId}); 
    const accountDetails=await Account.findOne({userId:req.userId});    
    return res.json({
        user:{
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            username:userDetails.username,
        },
        account:{
            balance:accountDetails.balance,
        }
    })
})

const signupBody=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string(),
});

router.post('/signup',async (req,res)=>{
    try{

        const {success}=signupBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message:"Email already taken / Incorrect inputs"
            });
        }

        const existingUser=await User.findOne({
            username:req.body.username
        });

        if(existingUser){
            return res.status(411).json({
                message:"Email already taken / Incorrect inputs"
            });
        }

        const user=await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        });

        // creating new account

        const account=await Account.create({
            userId:user._id,
            balance: Math.floor(Math.random()*10000) +1
        })

        const token=jwt.sign({
            userId: user._id
        },JWT_SECRET);

        console.log("created successfully");

        res.json({
            message:"User created successfully",
            token:token
        })

    }catch(error){
        console.log("error while create entry in db");
        return res.status(411).json({
            message:"error in creating entry in db"
        });
    }
});

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
})

router.post('/signin',async (req,res)=>{
    const {success}=signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"invalid username / password"
        });
    }

    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id,
        },JWT_SECRET);
        return res.status(200).json({
            token: token
        });
    }

    res.status(411).json({
        message:"Error while logging in"
    })
});

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

router.put('/',authMiddleware,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"error while updating",
        });
    }
    await User.updateOne({
        _id:req.userId
    },req.body);

    res.json({
        message:"updated Successfully"
    });
})

router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[
            {
                firstName:{
                    "$regex":filter,
                }
            },{
                lastName:{
                    "$regex":filter,
                }
            }
        ]
    })

    res.json({
        user:users.map(user=>(
            {
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }
        ))
    })
})

module.exports=router;