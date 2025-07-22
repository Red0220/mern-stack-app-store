import express from "express";
import { socketMiddleware } from "../middleware/socket.js";
import { verifyToken } from "../utilities/vrifyToken.js";
import { verifyAdmin } from "../utilities/verifyAdmin.js";

import {
  signUp,
  logging,
  logout,
  getUsers,
  getUserById,
  updateProfile,
  deleteUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.use(socketMiddleware);

router.post("/sign-up", signUp);
router.post("/sign-in", logging);

//private routes
router.route("/log-out").post(verifyToken, logout);
router.route("/profile/:userId").get(verifyToken, getUserById);
router.route("/update/:userId").patch(verifyToken, updateProfile);
router.route("/delete/:userId").delete(verifyToken, verifyAdmin, deleteUser);
//admin
router.route("/users").get(verifyToken, verifyAdmin, getUsers);

export default router;
