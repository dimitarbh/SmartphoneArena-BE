import express from "express"
import connectDb from "./connectDb.js";
import auth from "../routes/userRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from '../routes/cors.js';

dotenv.config()
const app = express()
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;
app.use(express.json());

connectDb().then(() => {
  console.log(`connected to MongoDb`)
  app.listen(port, "0.0.0.0", () => {
    console.log("Server is running on port 3000")
  })
  app.use("/auth", auth)
})
