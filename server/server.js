const express = require("express")
const app = express()
const cors = require("cors")
const bodyPaser = require("body-parser")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const UserRoute = require("./routes/userRoutes")
const PORT = process.env.PORT || 5700
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyPaser.json())
app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  app.use("/api", UserRoute)

  app.get("/", (req, res) => {
    res.send("Home Page");
  });

  mongoose.connect('mongodb://127.0.0.1:27017/projet', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((err) => console.log('Erreur de connexion à la base de données', err));

  app.listen(PORT, () => {
    console.log(`server demarer sur http://localhost:${PORT}`)
  })
