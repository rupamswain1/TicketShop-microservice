import express,{Request,Response} from 'express';
import {body,validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';

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
    throw new DatabaseConnectionError(); 
    res.send({message:'success'})
});

export {router as signUpRouter}