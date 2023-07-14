import mongoose from "mongoose";
import { BookModel, IBook } from "./books.interface";
import { bookGenres } from "./books.constants";

const bookSchema = new mongoose.Schema<IBook, BookModel>(
    {
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
            enum: bookGenres,
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
                        type: mongoose.Types.ObjectId,
                        required: true,
                    },
                    review: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    },
    { timestamps: true, versionKey: false },
);

const Books = mongoose.model<IBook, BookModel>("Books", bookSchema);

export default Books;
