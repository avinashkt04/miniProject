import { Router } from "express";
import passport from "passport";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/assistant",
    failureRedirect: "http://localhost:5173/login",
  })
);

router.get("/login/success", async (req, res) => {
  if (req.user) {
    const existedUser = await User.findOne({
      email: req.user.emails[0].value,
    });
    if (existedUser) {
      const token = await existedUser.generateAccessToken();
      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(StatusCodes.OK)
        .cookie("token", token, options)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            {user: existedUser},
            "User logged in successfully"
          )
        );
    } else {
      const newUser = new User({
        name: req.user.displayName,
        email: req.user.emails[0].value,
        password: Date.now(),
        displayImage: req.user.photos[0].value,
      });
      const token = await newUser.generateAccessToken();
      await newUser.save();

      const options = {
        httpOnly: true,
        secure: true,
      };

      res
        .status(StatusCodes.OK)
        .cookie("token", token, options)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            {user: newUser},
            "User logged in successfully"
          )
        );
    }
  }
});

export default router;
