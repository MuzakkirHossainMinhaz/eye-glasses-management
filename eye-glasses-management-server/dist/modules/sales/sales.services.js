"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesServices = void 0;
const eyeGlass_model_1 = require("../eyeGlass/eyeGlass.model");
const sales_model_1 = require("./sales.model");
const createSale = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sale = yield sales_model_1.SalesModel.create(payload);
    const eyeGlass = yield eyeGlass_model_1.EyeGlassModel.findById(sale.productId);
    if (eyeGlass) {
        eyeGlass.quantity = eyeGlass.quantity - sale.quantity;
        yield eyeGlass.save();
    }
    return sale;
});
const getAllSales = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    let sales = yield sales_model_1.SalesModel.find();
    sales = sales.filter((sale) => sale.sellerId._id.toString() === userData._id.toString());
    return sales;
});
// const getSalesByCategory = async (category: string) => {
//     let sales;
//     if (category === "all" || category === "") {
//         sales = await SalesModel.find();
//     } else if (category === "daily") {
//         sales = await SalesModel.find({
//             saleDate: {
//                 $gte: new Date().setHours(0, 0, 0, 0),
//                 $lt: new Date().setHours(23, 59, 59, 999),
//             },
//         });
//     } else if (category === "weekly") {
//         const currentDate = new Date();
//         const firstDayOfWeek = new Date(
//             currentDate.setDate(currentDate.getDate() - currentDate.getDay()),
//         );
//         const lastDayOfWeek = new Date(
//             currentDate.setDate(
//                 currentDate.getDate() - currentDate.getDay() + 6,
//             ),
//         );
//         sales = await SalesModel.find({
//             saleDate: {
//                 $gte: firstDayOfWeek.setHours(0, 0, 0, 0),
//                 $lt: lastDayOfWeek.setHours(23, 59, 59, 999),
//             },
//         });
//     } else if (category === "monthly") {
//         const currentDate = new Date();
//         const firstDayOfMonth = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             1,
//         );
//         const lastDayOfMonth = new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth() + 1,
//             0,
//         );
//         sales = await SalesModel.find({
//             saleDate: {
//                 $gte: firstDayOfMonth.setHours(0, 0, 0, 0),
//                 $lt: lastDayOfMonth.setHours(23, 59, 59, 999),
//             },
//         });
//     } else if (category === "yearly") {
//         const currentDate = new Date();
//         const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
//         const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);
//         sales = await SalesModel.find({
//             saleDate: {
//                 $gte: firstDayOfYear.setHours(0, 0, 0, 0),
//                 $lt: lastDayOfYear.setHours(23, 59, 59, 999),
//             },
//         });
//     } else {
//         throw new AppError(httpStatus.BAD_REQUEST, "Invalid category");
//     }
//     return sales;
// };
exports.SalesServices = {
    createSale,
    getAllSales,
};
