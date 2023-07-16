"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("./books.controller"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const books_validation_1 = require("./books.validation");
const router = express_1.default.Router();
router.get("/", books_controller_1.default.getAllBooks);
router.get("/:id", books_controller_1.default.getSpecificBook);
router.patch("/:id", (0, validateRequest_1.default)(books_validation_1.updateBookZodValidationSchema), books_controller_1.default.editBook);
router.post("/", (0, validateRequest_1.default)(books_validation_1.createBookZodValidationSchema), books_controller_1.default.createBook);
router.delete("/:id", books_controller_1.default.deleteBook);
router.post("/addReview/:id", (0, validateRequest_1.default)(books_validation_1.addReviewZodValidationSchema), books_controller_1.default.addReview);
exports.default = router;
