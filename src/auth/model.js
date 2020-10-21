import {Schema, model } from 'mongoose';

const userSchema = new Schema({
    login:{
        type:String,
        required:true,
        unique:true,
        minlength:1
    },
    password:{
        type:String,
        required:true,
        minlength:1
    }
});

const User = model("User", userSchema);

export default User;