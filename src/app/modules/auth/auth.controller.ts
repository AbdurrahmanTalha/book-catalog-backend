import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interface";
import service from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await service.createUserService(req.body);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: result,
    });
});

export default { createUser };
