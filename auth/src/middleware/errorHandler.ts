import {Request,Response,NextFunction} from 'express';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';
import { RequestValidationError } from '../errors/requestValidationError';

export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{

    interface errorResponse{
        error:
            {
                message:String,
                field?:String
            }[]
        
    }
  
    if(err instanceof RequestValidationError){
        const errorResp:errorResponse={
            error:err.serializeError(),
        }
        return res.status(err.statusCode).send(errorResp);
    }
    else if(err instanceof DatabaseConnectionError){
        const errorResp:errorResponse={
            error:err.serializeError()
        }
        return res.status(err.statusCode).send(errorResp)
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