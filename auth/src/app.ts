import express from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signUpRouter } from './routes/signup';
const app=express();
app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.listen(4000,()=>{
    console.log(">>>>>Auth Service Listining on Port: 4000<<<<<<<")
})