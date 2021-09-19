import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken'
import { CurrentUser } from '../middleware/currentUser';
const router=express.Router();

router.get('/api/users/currentUser',
CurrentUser,
(req:Request,res:Response)=>{
   res.send({CurrentUser:req.currentUser||null})
});

export {router as currentUserRouter}