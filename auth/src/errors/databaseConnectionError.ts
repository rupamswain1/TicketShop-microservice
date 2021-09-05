import { CustomError } from "./abstractClass/customError";
export class DatabaseConnectionError extends CustomError{
    reason="Error Connecting To DataBase";
    statusCode=500;
    constructor(){
        super("Error Connecting to DataBase");

        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }

    serializeError(){
        return [{ message:this.reason}];
    }
}