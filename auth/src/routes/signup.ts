import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {body,validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/badRequestError';
import {User} from '../models/users';

const router=express.Router();

const emailValidation= body('email').isEmail().withMessage('Please provide a valid Email');
const passwordValidation=body('password').trim().isLength({min:4,max:20}).withMessage('Please provide a valid password with length between 4 to 11')

router.post('/api/users/signup',[
    emailValidation,
    passwordValidation
],async (req:Request,res:Response)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        throw new RequestValidationError(error.array());
    }

    const {email,password}=req.body;
    const existingUser=await User.findOne({email:email});
    if(existingUser){
        throw new BadRequestError("Email Already Exists")
    }
    
    const user=await User.build({email,password}).save();   

    //Generate JWT
    const userJwt=jwt.sign({
        id:user.id,
        email: user.email
    },'thisIsTheSecretKey')

    //Store it in the session object
    req.session={
        jwt: userJwt
    };


    res.status(200).send(user) 
});

export {router as signUpRouter}