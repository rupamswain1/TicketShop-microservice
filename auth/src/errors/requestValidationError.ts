import { ValidationError } from "express-validator";

export class RequestValidationError extends Error{
    statusCode=400;
    constructor(public error:ValidationError[]){
        super();
          //As we are extending a build in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
  
    serializeError(){
        return this.error.map((err=>{
            return{message: err.msg,field:err.param}
        }))
    }
}