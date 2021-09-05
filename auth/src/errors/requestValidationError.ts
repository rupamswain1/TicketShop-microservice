import { ValidationError } from "express-validator";
import { CustomError } from "./abstractClass/customError";
export class RequestValidationError extends CustomError{
    statusCode=400;
    constructor(public error:ValidationError[]){
        super("Invalid Request Parameters during Authentication");
          //As we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
  
    serializeError(){
        return this.error.map((err=>{
            return{message: err.msg,field:err.param}
        }))
    }
}