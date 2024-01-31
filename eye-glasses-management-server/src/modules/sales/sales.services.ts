import { JwtPayload } from "jsonwebtoken";
import { EyeGlassModel } from "../eyeGlass/eyeGlass.model";
import { ISales } from "./sales.interface";
import { SalesModel } from "./sales.model";

const createSale = async (payload: ISales) => {
    const sale = await SalesModel.create(payload);
    const eyeGlass = await EyeGlassModel.findById(sale.productId);

    if (eyeGlass) {
        eyeGlass.quantity = eyeGlass.quantity - sale.quantity;
        await eyeGlass.save();
    }

    return sale;
};

const getAllSales = async (userData: JwtPayload) => {
    let sales = await SalesModel.find();

    sales = sales.filter(
        (sale: ISales) =>
            sale.sellerId._id.toString() === userData._id.toString(),
    );

    return sales;
};

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

export const SalesServices = {
    createSale,
    getAllSales,
};
