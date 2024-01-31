import httpStatus from "http-status";
import { IQuery } from "../../interfaces";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EyeGlassServices } from "./eyeGlass.services";

const createEyeGlass = catchAsync(async (req, res) => {
    const eyeGlasses = await EyeGlassServices.createEyeGlass(
        req.user,
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Eye Glass created successfully",
        data: eyeGlasses,
    });
});

const deleteEyeGlassById = catchAsync(async (req, res) => {
    const eyeGlasses = await EyeGlassServices.deleteEyeGlassById(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Eye Glass deleted successfully",
        data: eyeGlasses,
    });
});

const deleteAllEyeGlasses = catchAsync(async (req, res) => {
    const eyeGlasses = await EyeGlassServices.deleteAllEyeGlasses(req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Eye Glasses deleted successfully",
        data: eyeGlasses,
    });
});

const updateEyeGlassById = catchAsync(async (req, res) => {
    const { eyeGlassId } = req.params;

    const eyeGlass = await EyeGlassServices.updateEyeGlassById(
        eyeGlassId,
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Eye Glass updated successfully",
        data: eyeGlass,
    });
});

const getAllEyeGlasses = catchAsync(async (req, res) => {
    const queryParams = req.query as IQuery;
    const { page, limit } = queryParams;

    const eyeGlasses = await EyeGlassServices.getAllEyeGlasses(
        req.user,
        queryParams,
    );

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Eye Glasses fetched successfully",
        meta: {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            total: eyeGlasses.length,
        },
        data: eyeGlasses,
    });
});

const getEyeGlassById = catchAsync(async (req, res) => {
    const { eyeGlassId } = req.params;

    const eyeGlass = await EyeGlassServices.getEyeGlassById(eyeGlassId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Eye Glass fetched successfully",
        data: eyeGlass,
    });
});

export const EyeGlassControllers = {
    createEyeGlass,
    deleteEyeGlassById,
    deleteAllEyeGlasses,
    updateEyeGlassById,
    getAllEyeGlasses,
    getEyeGlassById,
};
