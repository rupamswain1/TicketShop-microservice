import express from 'express';
import {json} from 'body-parser';

const app=express();
app.use(json());

app.get('/api/users/',(req,res,next)=>{
    res.json({message:"success"})
})

app.listen(4000,()=>{
    console.log(">>>>>Auth Service Listining on Port: 4000<<<<<<<")
})