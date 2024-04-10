import express from "express"
import connectDb from "./connectDb.js";
import auth from "../routes/userRoutes.js";
const app = express()
app.use(express.json());

connectDb().then(() => {
  console.log(`connected to MongoDb`)
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  })
    app.use("/auth", auth)
})

