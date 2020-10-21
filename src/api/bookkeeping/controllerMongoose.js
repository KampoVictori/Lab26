import Bookkeeping from "./model";
import mongoose from "mongoose";

function makeQueryObject(query) {
    let result = {};
    console.log(query);
    if (query.count) {
        result.count_kids = { 
                $lte: parseInt(query.count)
        };
    }
    if (query.pos) {
        result.position = { 
                $eq: query.pos
        }
    }
    console.log(result);
    return result;
};

const bookkeepingControler = {
    //connect: async () =>{//параметри бази
       // const dbUrl = 'mongodb://localhost:27017/BookkeepingMongoose';
    //try {
            //await  mongoose.connect(dbUrl, {
               // useNewUrlParser: true,
               //useUnifiedTopology: true,
               //useFindAndModify: false  
          // });
           //console.log("DB connected"); 
        //} catch (error){
            //console.error(error);
            //throw error;
        //}
   //},
    get: async (req, res) =>{
        try {
            const books = await Bookkeeping.find(makeQueryObject(req.query));
            res.send(books);
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    getById: async (req, res) =>{
        try {
            const book = await Bookkeeping.findById(req.params.id);
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) =>{
        try {
            const newBook = new Bookkeeping(req.body);
            const book = await newBook.save();            
            res.send(book);             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const book = await Bookkeeping.findByIdAndDelete(req.params.id);
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) =>{
        try {
            const book = await Bookkeeping.findOneAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (book) 
                res.send(book);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    }
}


export default bookkeepingControler;