import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken =  (req,res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(500).send("Nie zalogowany")
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if (err) {
            return res.status(500).send("błędny token")
          }
        const dbUser = await User.findById(user.id)
        if(dbUser.token !== user.token) {
            return res.status(500).send("błędny refresh token")
        }
        req.user = user;
        next()
    })
}

export const verifyAdmin = (req,res, next) => {

    verifyToken(req,res, ()=> {
        if(req.user.isAdmin) {
             next()
        }else {
            return res.status(500).send("Brak admina")
        }
    })

}
