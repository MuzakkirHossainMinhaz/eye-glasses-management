"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeGlassModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const eyeGlassSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    frameMaterial: {
        type: String,
        enum: [
            "metal",
            "plastic",
            "wood",
            "silicone",
            "leather",
            "acetate",
            "carbon-fiber",
            "other",
        ],
        required: [true, "Frame Material is required"],
    },
    frameColor: {
        type: String,
        enum: ["black", "white", "blue", "red", "green", "other"],
        required: [true, "Frame Color is required"],
    },
    frameShape: {
        type: String,
        enum: [
            "rimless",
            "oval",
            "circle",
            "rectangle",
            "square",
            "round",
            "cat-eye",
            "heart",
            "triangle",
            "butterfly",
            "other",
        ],
        required: [true, "Frame Shape is required"],
    },
    lensType: {
        type: String,
        enum: [
            "single-vision",
            "bifocal",
            "trifocal",
            "progressive",
            "uv-protective",
            "aspheric",
            "polarized",
            "other",
        ],
        required: [true, "Lens Type is required"],
    },
    brand: {
        type: String,
        enum: [
            "ray-ban",
            "oakley",
            "prada",
            "gucci",
            "dior",
            "coach",
            "other",
        ],
        required: [true, "Brand is required"],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Gender is required"],
    },
    color: {
        type: String,
        required: [true, "Color is required"],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.EyeGlassModel = mongoose_1.default.model("EyeGlass", eyeGlassSchema);
