import express from "express";
import controller from "./books.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookZodValidationSchema } from "./books.validation";

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getSpecificBook);
router.post(
    "/",
    validateRequest(createBookZodValidationSchema),
    controller.createBook,
);

export default router;
