const express=require("express");
const app=express();
const cors=require('cors');
const rootRouter=require('./routes/index');
require("dotenv").config();

const PORT=process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`);
})