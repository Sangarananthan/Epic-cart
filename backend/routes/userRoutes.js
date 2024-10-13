import express from "express";
import { createUser } from "../controllers/userController.js";

const userRoutes = express.Router();
userRoutes.route("/").post(createUser);
export default userRoutes;
