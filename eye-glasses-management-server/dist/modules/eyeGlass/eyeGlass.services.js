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
exports.EyeGlassServices = void 0;
const queryBuilder_1 = require("../../builder/queryBuilder");
const eyeGlass_model_1 = require("./eyeGlass.model");
const sales_model_1 = require("../sales/sales.model");
const createEyeGlass = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.createdBy = userData._id;
    const eyeGlass = yield eyeGlass_model_1.EyeGlassModel.create(payload);
    return eyeGlass;
});
const deleteEyeGlassById = (eyeGlassIds) => __awaiter(void 0, void 0, void 0, function* () {
    const eyeGlasses = [];
    for (const eyeGlassId of eyeGlassIds) {
        eyeGlasses.push(yield eyeGlass_model_1.EyeGlassModel.findByIdAndDelete(eyeGlassId));
    }
    return eyeGlasses;
});
const deleteAllEyeGlasses = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const eyeGlasses = yield eyeGlass_model_1.EyeGlassModel.deleteMany({
        createdBy: userData._id,
    });
    const sales = yield sales_model_1.SalesModel.deleteMany({
        sellerId: userData._id,
    });
    return [eyeGlasses, sales];
});
const updateEyeGlassById = (eyeGlassId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const eyeGlass = yield eyeGlass_model_1.EyeGlassModel.findByIdAndUpdate(eyeGlassId, payload, {
        new: true,
    });
    return eyeGlass;
});
const getAllEyeGlasses = (userData, queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    let eyeGlasses = yield (0, queryBuilder_1.queryBuilder)(queryParams, eyeGlass_model_1.EyeGlassModel)
        .populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    })
        .exec();
    eyeGlasses = eyeGlasses.filter((eyeGlass) => eyeGlass.createdBy._id.toString() === userData._id.toString());
    return eyeGlasses;
});
const getEyeGlassById = (eyeGlassId) => __awaiter(void 0, void 0, void 0, function* () {
    const eyeGlass = yield eyeGlass_model_1.EyeGlassModel.findById(eyeGlassId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    return eyeGlass;
});
exports.EyeGlassServices = {
    createEyeGlass,
    deleteEyeGlassById,
    deleteAllEyeGlasses,
    updateEyeGlassById,
    getAllEyeGlasses,
    getEyeGlassById,
};
