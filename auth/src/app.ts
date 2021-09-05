import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signUpRouter } from './routes/signup';
import {errorHandler} from './middleware/errorHandler';
import { NotFoundError } from './errors/notFoundError';
const app=express();
app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);

app.all('*',async()=>{
    throw new NotFoundError();
})

app.use(errorHandler)

app.listen(4000,()=>{
    console.log(">>>>>Auth Service Listining on Port: 4000<<<<<<<") 
})