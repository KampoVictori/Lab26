import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./model";

const userControler = {
    register: async (req, res)=>{
        try{
            const userFound = await User.findOne({login: req.body.login});
            if (userFound) {
                res.status(409).send ("Login is already used.");
            }
            else {
                const password = req.body.password;
                const cryptedPassword = await bcryptjs.hash(password, 10);
                const user = new User ({
                    login:req.body.login,
                    password:cryptedPassword,
                });
                await user.save();
                res.status(201).send (user) ;
            }
        } catch (error){
            console.error(error);  
            res.status(500).send(error);                      
        }
    },
    login:  async (req,res)=>{
        try{
            const userFound = await User.findOne({login: req.body.login});
            if (userFound) {
                const checkPassword = await bcryptjs.compare(req.body.password, userFound.password);
                if (checkPassword){
                    const token = jwt.sign({
                        login: userFound.login,
                        id: userFound._id
                    }, 
                    "68BCC73B8BC2157F8BD422FF5FF6319C1BB70EF6F10D3408C81EBA813E5F2B8D",
                    {
                        expiresIn: 600,
                    });
                    res.send({token:token});
                } 
                else {
                    res.send(401).send("Wrong password");
                }
            }
            else {
                res.status(404).send("User not found");
            }
        } catch (error){
            console.error(error);  
            res.status(500).send(error);                      
        }
    },
}

export default userControler;