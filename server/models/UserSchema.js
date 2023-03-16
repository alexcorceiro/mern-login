const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    prenom : {
        type: String, 
        required: true
    },
    nom: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password : {
        type: String,
        required: true
    }, 
    role : {
        type: String, 
        enum : ["user", "admin"], 
        default: "user"
    }
})

const User = mongoose.model("Utilisateur", UserSchema)

module.exports = User
