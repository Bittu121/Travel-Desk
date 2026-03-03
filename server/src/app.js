import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import travelRequestRoute from "./routes/travelRequestRoutes.js";
import travelPendingAndApproveRoute from "./routes/travelPendingAndApproveRoutes.js";

const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use("/api/v1/auth/user", userRoute);
app.use("/api/v1/travel", travelRequestRoute);
app.use("/api/v1/travel-requests", travelPendingAndApproveRoute);

export default app;
