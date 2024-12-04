import { Router } from "express";
import { jwtVerify } from "../middlewares/user.middleware.js";
import { addUserQuery, deleteQuery } from "../controllers/query.controller.js";

const router = Router();

router.route("/add-query").post(jwtVerify, addUserQuery);
router.route("/delete-query/:id").delete(jwtVerify, deleteQuery);

export default router;
