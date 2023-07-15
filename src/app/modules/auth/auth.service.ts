import { IUser } from "./auth.interface";
import User from "./auth.model";

const createUserService = async (payload: IUser) => {
    const user = await User.create(payload);
    return user;
};

export default { createUserService };
