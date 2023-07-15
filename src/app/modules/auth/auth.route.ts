import express from "express";
import controller from "./auth.controller";

const router = express.Router();

router.post("/signup", controller.createUser);

export default router;
