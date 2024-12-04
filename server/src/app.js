import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import passport from "passport";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
passportURL(app)

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import queryRouter from "./routes/query.route.js"
import passportURL from "./utils/passport.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1", authRouter)
app.use("/api/v1", queryRouter)

export { app };
