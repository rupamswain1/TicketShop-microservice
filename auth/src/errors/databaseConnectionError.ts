
export class DatabaseConnectionError extends Error{
    reason="Error Connecting To DataBase";
    statusCode=500;
    constructor(){
        super();

        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }

    serializeError(){
        return [{ message:this.reason}];
    }
}