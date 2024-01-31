import { queryBuilder } from "../../builder/queryBuilder";
import { IQuery } from "../../interfaces";
import { JwtPayload } from "jsonwebtoken";
import { IEyeGlass } from "./eyeGlass.interface";
import { EyeGlassModel } from "./eyeGlass.model";
import { SalesModel } from "../sales/sales.model";

const createEyeGlass = async (userData: JwtPayload, payload: IEyeGlass) => {
    payload.createdBy = userData._id;
    const eyeGlass = await EyeGlassModel.create(payload);
    return eyeGlass;
};

const deleteEyeGlassById = async (eyeGlassIds: string[]) => {
    const eyeGlasses = [];

    for (const eyeGlassId of eyeGlassIds) {
        eyeGlasses.push(await EyeGlassModel.findByIdAndDelete(eyeGlassId));
    }

    return eyeGlasses;
};

const deleteAllEyeGlasses = async (userData: JwtPayload) => {
    const eyeGlasses = await EyeGlassModel.deleteMany({
        createdBy: userData._id,
    });

    const sales = await SalesModel.deleteMany({
        sellerId: userData._id,
    });

    return [eyeGlasses, sales];
};

const updateEyeGlassById = async (
    eyeGlassId: string,
    payload: Partial<IEyeGlass>,
) => {
    const eyeGlass = await EyeGlassModel.findByIdAndUpdate(
        eyeGlassId,
        payload,
        {
            new: true,
        },
    );

    return eyeGlass;
};

const getAllEyeGlasses = async (userData: JwtPayload, queryParams: IQuery) => {
    let eyeGlasses = await queryBuilder(queryParams, EyeGlassModel)
        .populate({
            path: "createdBy",
            select: "-createdAt -updatedAt",
        })
        .exec();

    eyeGlasses = eyeGlasses.filter(
        (eyeGlass: IEyeGlass) =>
            eyeGlass.createdBy._id.toString() === userData._id.toString(),
    );

    return eyeGlasses;
};

const getEyeGlassById = async (eyeGlassId: string) => {
    const eyeGlass = await EyeGlassModel.findById(eyeGlassId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });

    return eyeGlass;
};

export const EyeGlassServices = {
    createEyeGlass,
    deleteEyeGlassById,
    deleteAllEyeGlasses,
    updateEyeGlassById,
    getAllEyeGlasses,
    getEyeGlassById,
};
