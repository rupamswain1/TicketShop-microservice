import {Request,Response,NextFunction} from 'express';
import { CustomError } from '../errors/abstractClass/customError';
export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{

    interface errorResponse{
        error:
            {
                message:String,
                field?:String
            }[]
        
    }
  
    if(err instanceof CustomError){
        const errorResp:errorResponse={
            error:err.serializeError(),
        }
        return res.status(err.statusCode).send(errorResp);
    }
   
    const errResponse:errorResponse={
        error:[
            {message:'Something went wrong....'}
        ]
    }
    // console.log('insisde error handler>>>>>>>>')
    // console.log('Something went wrong',err);
    res.status(400).send({message:""});
}