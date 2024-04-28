import express from "express";
import connectDb from "./connectDb.js";
import auth from "../routes/userRoutes.js";
import model from "../routes/brandCurrentModel.js"
import brands from "../routes/brands.js"
import brandModels from "../routes/brandModels.js"
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from '../routes/cors.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors(corsOptions));
app.use(express.json());

async function startServer() {
  try {
    await connectDb();
    console.log(`Connected to MongoDB`);
    
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
    
    app.use("/auth", auth);
    app.use("/model", model);
    app.use("/brands", brands)
    app.use("/brands/:brandId/models", brandModels);

    
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
