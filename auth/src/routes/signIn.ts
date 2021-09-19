import express,{Request,Response} from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { validationRequest } from '../middleware/validateRequest';
const router=express.Router();

const emailValidation=body('email').isEmail().withMessage('Please Enter a Valid Email')
const passwordValidation=body('password').trim().notEmpty().withMessage('Password cannot be left blank');

router.post('/api/users/signin',
[emailValidation,passwordValidation],
validationRequest,
(req:Request,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
})

export {router as signInRouter};