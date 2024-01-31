import {
    TBrand,
    TFrameMaterial,
    TFrameShape,
    TLensType,
} from "./modules/eyeGlass/eyeGlass.constant";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IErrorResponse {
    statusCode: number;
    message: string;
    errorMessage: string;
    errorDetails: Record<string, any>;
}

export interface IQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    minPrice?: number;
    maxPrice?: number;
    frameMaterial?: TFrameMaterial;
    frameShape?: TFrameShape;
    lensType?: TLensType;
    brand?: TBrand;
    gender?: "male" | "female";
    color?: string;
}
