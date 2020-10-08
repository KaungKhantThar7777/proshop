import express from "express";
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers).post(registerUser);
router
  .route("/:id")
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
