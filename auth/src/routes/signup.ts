import express,{Request,Response} from 'express';
import {body,validationResult} from 'express-validator';

const router=express.Router();

const emailValidation= body('email').isEmail().withMessage('Please provide a valid Email');
const passwordValidation=body('password').trim().isLength({min:4,max:20}).withMessage('Please provide a valid password with length between 4 to 11')

router.post('/api/users/signup',[
    emailValidation,
    passwordValidation
],(req:Request,res:Response)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        throw new Error("Invalid Email and Password")
    }

    const {email,password}=req.body;
    throw new Error('Error Connecting to DataBase')
    res.send({message:'success'})
});

export {router as signUpRouter}