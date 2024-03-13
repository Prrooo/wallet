const express=require("express");
const app=express();
const cors=require('cors');
const rootRouter=require('./routes/index');
require("dotenv").config();

const PORT=process.env.PORT || 4000;

const corsConfig={
    origin:"*",
    Credential:true,
    methods:["GET","POST","PUT","DELETE"],
}
app.options("",cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`);
})