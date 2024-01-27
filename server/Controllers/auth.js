import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const register = (req,res)=>{
    //check existing user
    const q = "select * from users where email=? or username=?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exists")
      
        //hash pass
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const q = "insert into users(`username`,`email`,`password`) values (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
            
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("user has been created successfully")
        })
    })

}
export const login = (req,res)=>{
    const q = "select * from users where username=(?) "
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length==0) return res.status(404).json("user not found")

        const ispasscorrect = bcrypt.compareSync(req.body.password,data[0].password)
        if(!ispasscorrect) return res.status(400).json("wrong username or password")
        const token = jwt.sign({id:data[0].id},"jwtkey")
    const {passowrd,...other} = data[0]
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(other)
 

    })
}
export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
      }).status(200).json("User has been logged out.")
}
