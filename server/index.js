import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import travelRequestRoute from "./routes/travelRequestRoutes.js";
dotenv.config();
const app = express();

//db connection
connectDB();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/api/v1/auth/user", userRoute);
app.use("api/v1/travel-request", travelRequestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
