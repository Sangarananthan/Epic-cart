import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
} from "../controllers/userController.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();
userRoutes
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUser);
userRoutes.post("/auth", loginUser);
userRoutes.post("/logout", logoutCurrentUser);
export default userRoutes;
