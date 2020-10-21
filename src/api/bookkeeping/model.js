import {Schema, model } from 'mongoose';

const bookkeepingSchema = new Schema({
    Name: 
    {
        type:String,
        required:true,
    },
    position: 
    {
        type: String,
        required:true,
    },
    salary:
    { 
        type: Number,
        min: 0,
        max: 100000,
        required:true
    },
    count_kids: 
    {
        type:Number,
        min: 0,
        max: 20,
    },
    experience: {
        type:Number, 
        min:0,
        max:50,
        required:true
    }
});

const Bookkeeping = model("Bookkeeping", bookkeepingSchema);

export default Bookkeeping;