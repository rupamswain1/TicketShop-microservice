import express from 'express';
import 'express-async-errors'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'; 
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signIn';
import {errorHandler} from './middleware/errorHandler';
import { signoutRouter } from './routes/signout';
import { NotFoundError } from './errors/notFoundError';
const app=express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed:false,
        secure:true//put this to true
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signoutRouter);
// app.all('*',async()=>{
//     throw new NotFoundError();
// })

app.use(errorHandler)

const start=async ():Promise<void>=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT KEY is not defined')
    }
    try{
        await mongoose.connect('')//MongoDB key here
        
    }
    catch(err){
        console.error(err)
    }
    app.listen(4000,()=>{
        console.log(">>>>>Auth Service Listining on Port: 4000<<<<<<<") 
    })
}
start();
