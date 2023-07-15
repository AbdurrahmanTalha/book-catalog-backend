import mongoose from "mongoose";
import { IUser, UserModel } from "./auth.interface";

const userSchema = new mongoose.Schema<IUser, UserModel>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
