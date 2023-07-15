import express from "express";
import controller from "./books.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
    createBookZodValidationSchema,
    updateBookZodValidationSchema,
} from "./books.validation";

const router = express.Router();

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getSpecificBook);
router.patch(
    "/:id",
    validateRequest(updateBookZodValidationSchema),
    controller.editBook,
);
router.post(
    "/",
    validateRequest(createBookZodValidationSchema),
    controller.createBook,
);
router.delete("/:id", controller.deleteBook);
router.post("/addReview/:id", controller.addReview);

export default router;
