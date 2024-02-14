import { Router } from "express";
import {
  login,
  getAllusers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  paginationUser,
  getUserSession,
} from "../controllers/users.controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

// USERS
router.post("/api/login", login);
router.get("/api/getUserSession", authenticateToken, getUserSession);
router.get("/api/paginationUser", authenticateToken, paginationUser);
router.get("/api/getAllUsers", authenticateToken, getAllusers);
router.get("/api/getUserById", authenticateToken, getUserById);
router.post("/api/createUser", createUser);
router.put("/api/updateUser", authenticateToken, updateUser);
router.delete("/api/deleteUser", authenticateToken, deleteUser);

// ...

// ...

export default router;
