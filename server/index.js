import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";


dotenv.config()


const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan("dev"));
app.use(express.json());

//router middleware
app.use("/api", authRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
