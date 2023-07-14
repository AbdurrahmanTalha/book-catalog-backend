import express from "express";
import controller from "./books.controller";

const router = express.Router();

router.get("/", controller.getAllBooks);
router.post("/", controller.createBook);

export default router;
