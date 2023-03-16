const User = require("../models/UserSchema")
const bcrypt = require("bcrypt")
const jwtDecode = require("jwt-decode")
const { generateToken, getTokened } = require("../middleware/jeton")

exports.register = async (req, res, next) =>{
    try{
      const { prenom, nom , email, password} = req.body
      const hashedPassword  = await bcrypt.hash(password, 10)
      const user = new User({
        prenom, 
        nom, 
        email, 
        password: hashedPassword
      })

      const token = generateToken(user._id, user.email, user.role)
      res.cookie("access_token", token, 
      { httpOnly: true, secure: true, sameSite: 'none' })

      await user.save()
      res.status(201).json({ message: "utilisateur enregister", user, token})
    }catch(err){
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try{
     const {email, password} = req.body
     const user = await User.findOne({email})

     if(!user){
        return res.status(401).json({ message: "email ou mot de passe incorrect"})
     }
    
     const isPasswordMatch = await bcrypt.compare(password, user.password)
     if(!isPasswordMatch){
        return res.status(401).json({ message: "mot de passe incorrect"})
     }

     const token = generateToken(user._id, user.email , user.role)
     res.cookie("access_token", token, 
     { httpOnly: true, secure: true, sameSite: 'none' })

     res.status(200).json({ message: "connect compte"})
    }catch(err){
        next(err)
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("access_token", {path: "/"})
    res.status(200).json({ message: "deconnection succées"})
}

exports.changeRole = async(req, res, next) => {
  try{
    const { userId , role } = req.body
    await User.updateOne({_id: userId}, {role})
    res.status(200).json({ message: 'role modifier success'})
  }catch(err){
    next(err)
  }
}

exports.getToken = async(req, res) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ message: 'veuille vous connecter' });
  }

  try {
    const {_id, email, role } = jwtDecode(token);
    return res.json({_id, email, role });
  
  } catch (error) {
    console.log(token)
    return res.status(401).json({ message: 'Invalid token' });
   
  }
}