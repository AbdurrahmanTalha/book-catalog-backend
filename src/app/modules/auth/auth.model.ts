import mongoose from "mongoose";
import { IUser, UserModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";

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
        wishlist: {
            type: [
                {
                    bookId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "books",
                    },
                    bookName: {
                        type: String,
                    },
                },
            ],
        },
    },
    { timestamps: true, versionKey: false },
);

userSchema.statics.isUserExist = async function (
    email: string,
): Promise<Pick<IUser, "email" | "password"> | null> {
    return await User.findOne({ email }, { email: 1, password: 1 }).exec();
};

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string,
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
