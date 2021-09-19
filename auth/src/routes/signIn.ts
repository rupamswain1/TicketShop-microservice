import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/users'

import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { BadRequestError } from '../errors/badRequestError';
import { validationRequest } from '../middleware/validateRequest';
import { Password } from '../services/password';
const router=express.Router();

const emailValidation=body('email').isEmail().withMessage('Please Enter a Valid Email')
const passwordValidation=body('password').trim().notEmpty().withMessage('Password cannot be left blank');

router.post('/api/users/signin',
[emailValidation,passwordValidation],
validationRequest,
async (req:Request,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const {email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError("Invalid Credentials");
    }
    const passwordValidation = await Password.comparePassword(existingUser.password,password);
  
    if(!passwordValidation){
        throw new BadRequestError("Invalid Credentials");
    }
    //Generate JWT
    const userJwt=jwt.sign({
        id:existingUser.id,
        email: existingUser.email
    },
    process.env.JWT_KEY!
    )

    //Store it in the session object
    req.session={
        jwt: userJwt
    };

    res.status(200).send({existingUser})

})

export {router as signInRouter};