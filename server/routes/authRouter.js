import express from "express";
import { signup,signin, logout } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/signup", signup);
authRouter.get("/login", signin);
authRouter.get("/logout", logout);

export default authRouter;