import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db.js";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
dotenv.config();
const app = express();

//db connection
connectDB();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
