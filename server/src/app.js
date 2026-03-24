import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import travelRequestRoute from "./routes/travelRequest.routes.js";
import travelPendingAndApproveRoute from "./routes/travelPendingAndApprove.routes.js";
import globalErrorHandler from "./middleware/error.middleware.js";
import uploadBillRoute from "./routes/uploadBills.routes.js";
import uploadTicketRoute from "./routes/uploadTickets.routes.js";
import checkedStatusRoute from "./routes/checkedStatus.routes.js";

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
app.use("/api/v1/bills", uploadBillRoute);
app.use("/api/v1/tickets", uploadTicketRoute);
app.use("/api/v1/status", checkedStatusRoute);
app.use(globalErrorHandler);

export default app;
