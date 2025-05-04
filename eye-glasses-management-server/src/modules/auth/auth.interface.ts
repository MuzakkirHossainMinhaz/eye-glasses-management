import { Types } from "mongoose";

export interface IAuth {
    username: string;
    password: string;
}

export interface IJWTPayload {
    _id: Types.ObjectId;
    email: string;
    username: string;
}
