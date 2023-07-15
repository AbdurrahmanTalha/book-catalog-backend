import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IUser } from "./auth.interface";
import service from "./auth.service";
import config from "../../../config/config";

const createUser = catchAsync(async (req, res) => {
    const result = await service.createUserService(req.body);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: result,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { ...loginData } = req.body;
    const result = await service.loginUserService(loginData);
    const cookieOptions = {
        secure: config.env === "production" ? true : false,
        httpOnly: true,
    };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    if ("refreshToken" in result) {
        delete result.refreshToken;
    }

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});

export default { createUser, loginUser };
