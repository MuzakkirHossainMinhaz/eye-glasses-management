import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { verifyJWT } from "../modules/auth/auth.utils";
import { UserModel } from "../modules/user/user.model";

const auth = () => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;

        // check if token is present
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // check if token is valid
        const { valid, expired, decoded } = verifyJWT(token);

        // check if decoded is valid
        if (!valid) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // check if token is expired
        if (expired) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        const { _id, email } = decoded as any;

        // check if user exists
        const user = await UserModel.findOne({ _id, email });
        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // set user
        req.user = user;

        next();
    });
};

export default auth;
