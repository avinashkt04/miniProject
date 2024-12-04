import { Router } from "express";
import {
  currentUser,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/current-user").get(jwtVerify, currentUser);
router.route("/logout").post(jwtVerify, userLogout);

export default router;
