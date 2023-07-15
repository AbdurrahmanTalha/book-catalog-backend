import mongoose from "mongoose";
import { IBook } from "../books/books.interface";

export type IUser = {
    email: string;
    password: string;
    wishlist: IBook[];
};

export type UserModel = mongoose.Model<IUser, string>;
