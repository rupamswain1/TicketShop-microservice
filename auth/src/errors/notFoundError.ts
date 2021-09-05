import { CustomError } from "./abstractClass/customError";

export class NotFoundError extends CustomError{
    statusCode=404;
    constructor(){
        super("Not Found Error in Auth Service")
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }
    serializeError(){
        return [{message:"Not Found"}]
    }
} 