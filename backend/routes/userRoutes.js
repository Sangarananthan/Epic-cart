import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
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

userRoutes
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .post(authenticate, updateCurrentUserProfile);
export default userRoutes;
