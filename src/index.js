//2-3 лабораторна
//import express from "express";
//import apiRouter from "./api/bookkeeping";
//import controllerMongoose from "./api/bookkeeping/controllerMongoose";

//const server = new express();

//server.use(express.urlencoded());
//server.use(express.json());
//server.use("/api/bookkeeping", apiRouter);
//controllerMongoose.connect().then(() => {
    //server.listen(5000);
    //console.log("http://localhost:5000");
//}).catch ((error)=>{
   // console.error(error);
//});

import express from "express";
import fs from "fs";
import https from "https";
import mongoose from "mongoose";
import passport from "passport";
import apiRouter from "./api/bookkeeping";
import authRouter from "./auth";
import setJwtStrategy from "./auth/jwtstrategy";

let dbUrl = 'mongodb://localhost:27017/BookkeepingMongoose';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
mongoose.connect(dbUrl, dbOptions).then(() => {
        try {
            
            console.log("DB connected");
            const server = express();
            server.use(express.urlencoded({ extended: false }));
            server.use(express.json());
            server.use(passport.initialize());
            setJwtStrategy(passport);
            server.use("/api/bookkeeping", apiRouter);
            server.use("/auth", authRouter);

            server.use((req, res, next) => {
                if (req.header('x-forwarded-proto') !== 'https')
                    res.redirect(`https://${req.header('host')}${req.url}`);
                else
                    next();
            });

            const httpsOptions = {
                key: fs.readFileSync('./keyandcert/key.pem'),
                cert: fs.readFileSync('./keyandcert/cert.pem'),

            };
            const httpsServer = https.createServer(httpsOptions, server);
            httpsServer.listen(3443);
            console.log("https://localhost:3443");
            server.listen(5000);
            console.log("http://localhost:5000");

        } catch (e) {
            console.error(e);
        }
    })
    .catch(error => {
        console.error(error);
    });