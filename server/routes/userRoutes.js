const express = require("express")
const router = express.Router()
const { register, login, changeRole, logout, getToken } = require("../controller/UserController")


router.post("/register", register)
router.post("/login", login)
router.put('/users/:id/role', changeRole)
router.post("/logout", logout)
router.get("/token", getToken);

module.exports = router