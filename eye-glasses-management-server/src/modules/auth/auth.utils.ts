import { IJWTPayload } from "./auth.interface";
import jwt from "jsonwebtoken";

export const createJWT = (payload: IJWTPayload): string => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    });
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET as string,
        );

        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
};

// return jwt.verify(
//     token,
//     process.env.JWT_ACCESS_SECRET as string,
// ) as IJWTPayload;
