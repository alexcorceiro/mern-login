const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")

const generateToken = (id, email, role) => {
    return jwt.sign({ _id: id, email, role}, process.env.JWT_SECRET, { expiresIn: "1d"})
}

const verifyisAdmin = (req, res, next) =>{
   const token = req.cookies["access_token"]
   if(!token){
    return res.status(401).json({ message: "token introuvable"})
   }

   try{
    const decodeToken = jwtDecode(token)
    if(!decodeToken.role.includes("admin")){
        return res.status(401).json({message: 'unauthorized'})
    }else{
        return res.status(200).json({ message: "connexion admin etablie"})
    }

   }catch(err){
    return res.status(401).json({ message: 'invalid token'})
   }


}

module.exports={generateToken, verifyisAdmin}