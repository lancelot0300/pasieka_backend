import jwt from "jsonwebtoken";

export const verifyToken = (req,res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return res.status(500).send("brak tokenu")
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(500).send("błędny token")
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
            return res.status(500).send("błędny użytkownik")
        }
    })

}

