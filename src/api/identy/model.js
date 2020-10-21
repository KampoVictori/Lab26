import {Schema, model } from 'mongoose';

const userSchema = new Schema({
    login: {
        type:String, 
        unique:[true, "Такий логін вже є"], 
        required:true,    
        minlength:[3, "Логін повинен бути довжиною не менше 3 символів"], 
        maxlength: 150  
    },
    password:{
        type:String, 
        validate:{ 
            validator: password => {
                let areDigits = /\d+/.test(password);
                let areCapitalLetters = /[A-Z]+/.test(password);   
                return areDigits && areCapitalLetters;
            },
            message:"Пароль повинен містити щонайменше 1 велику літеру, 1 цифру, ... "
        }
    },
    mail:{
        type:String,
        required:true,  
        match: [/^[\w\.-]+@[\w\.]+$/,"Введіть пошту в форматі example@mail.com"], 
    },
    age:{
        type:Number,
        min:18,
        max:100,
        validate:{
            validator: age =>{
                if (Math.abs(Math.trunc (age) - age) < 0.0001) 
                    return true;
                else
                    return false;                                          
            },
        }        
    },
    role:{
        type:String,
        enum:{   
            values:["Admin", "User", "Boss"],         
            message: 'Дозволені ролі "Admin", "User", "Boss"',
        },
        default:"User"

    },
    registred:{
        type:Date,
        default: Date.now() 
    }


});

const User = model("User", userSchema);

export default User;