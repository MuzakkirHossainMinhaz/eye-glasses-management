import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesServices } from "./sales.services";

const createSale = catchAsync(async (req, res) => {
    const sale = await SalesServices.createSale(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Sale created successfully",
        data: sale,
    });
});

const getAllSales = catchAsync(async (req, res) => {
    const sales = await SalesServices.getAllSales(req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Sales fetched successfully",
        data: sales,
    });
});

export const SalesController = {
    createSale,
    getAllSales,
};
