import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
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
  .put(authenticate, updateCurrentUserProfile);

userRoutes
  .route("/:id")
  .delete(authenticate, authorizedAdmin, deleteUser)
  .get(authenticate, authorizedAdmin, getUserById).put(authenticate, authorizedAdmin, updateUserById);

export default userRoutes;
