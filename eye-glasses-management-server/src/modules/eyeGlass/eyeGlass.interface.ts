import { Types } from "mongoose";
import {
    TBrand,
    TFrameColor,
    TFrameMaterial,
    TFrameShape,
    TLensType,
} from "./eyeGlass.constant";

export interface IEyeGlass {
    name: string;
    price: number;
    quantity: number;
    frameMaterial: TFrameMaterial;
    frameColor: TFrameColor;
    frameShape: TFrameShape;
    lensType: TLensType;
    brand: TBrand;
    gender: "male" | "female";
    color: string;
    createdBy: Types.ObjectId;
}
