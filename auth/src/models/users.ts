import mongoose from 'mongoose';
//Interface for creating new user
interface UserAttrs{
    email:string,
    password:string
}

//Interface for  that describes the property a User Model has
interface UserModel extends mongoose.Model<any>{
    build(attrs:UserAttrs):any;
}

const UserSchema=new mongoose.Schema({
    emai:{
        type:String,
        required: true
    },
    password: {
        type: String,
        require:true
    }
});

UserSchema.statics.build=(attrs:UserAttrs)=>{
    return new User(attrs);
}
const User=mongoose.model<any,UserModel>('User',UserSchema);

User.build({
    email:"asasasd",
    password: "12345"
})
export {User};