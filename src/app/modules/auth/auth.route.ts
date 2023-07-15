import express from "express";
import controller from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginZodValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
    "/signin",
    validateRequest(loginZodValidationSchema),
    controller.loginUser,
);
router.post("/signup", controller.createUser);

export default router;
