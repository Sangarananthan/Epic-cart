import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.route("/").post(createUser);
userRoutes.post("/auth" , loginUser)
export default userRoutes;
