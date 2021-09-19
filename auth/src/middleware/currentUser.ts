import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const CurrentUser=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.session?.jwt){
        return res.send({currentUser:null});
    }
    try {
        const payload=jwt.verify(req.session.jwt,process.env.JWT_KEY!);

    } catch (err) {
        
    }

}