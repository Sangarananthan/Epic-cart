import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.route("/").post(createUser);
userRoutes.post("/auth", loginUser);
userRoutes.post("/logout" , logoutCurrentUser)
export default userRoutes;
