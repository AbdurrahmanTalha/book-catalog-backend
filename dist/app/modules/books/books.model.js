"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const books_constants_1 = require("./books.constants");
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: books_constants_1.bookGenres,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    reviews: {
        type: [
            {
                user: {
                    type: String,
                    required: true,
                },
                review: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    img: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
const Books = mongoose_1.default.model("Books", bookSchema);
exports.default = Books;
