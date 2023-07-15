import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse, IUser } from "./auth.interface";
import User from "./auth.model";
import { createToken } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";

const createUserService = async (payload: IUser) => {
    const user = await User.create(payload);
    return user;
};

const loginUserService = async (
    payload: ILoginUser,
): Promise<ILoginUserResponse> => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }

    if (
        isUserExist.password &&
        !(await User.isPasswordMatched(payload.password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const { _id, email } = isUserExist;
    const accessToken = createToken(
        { _id, email },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string,
    );

    const refreshToken = createToken(
        { _id, email },
        config.jwt.jwt_refresh_secret as Secret,
        config.jwt.refresh_expires_in as string,
    );

    return {
        accessToken,
        refreshToken,
    };
};

export default { createUserService, loginUserService };
