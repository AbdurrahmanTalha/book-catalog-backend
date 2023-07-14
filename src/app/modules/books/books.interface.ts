import mongoose from "mongoose";

export type IGenre =
    | "Action"
    | "Fantasy"
    | "Science Fiction"
    | "Mystery"
    | "Romance"
    | "Historical Fiction"
    | "Horror"
    | "Thriller/Suspense"
    | "Comedy/Humor"
    | "Biography/Autobiography"
    | "Drama"
    | "Young Adult"
    | "Crime/Noir"
    | "Adventure"
    | "Poetry"
    | "Self-help"
    | "Satire"
    | "Western"
    | "Paranormal/Supernatural"
    | "Graphic Novel/Comic";

export type IReview = {
    comments: string;
    user: mongoose.Schema.Types.ObjectId;
};

export type IBook = {
    title: string;
    author: string;
    genre: IGenre;
    publishedAt: string;
    reviews?: IReview[];
};

export type IBookFilters = {
    title?: string;
    author?: string;
    genre?: string;
    publishedAt?: string;
    searchTerm?: string;
};

export type BookModel = mongoose.Model<IBook, string>;
