"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeGlassRoutes = void 0;
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middlewares/checkValidation"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const eyeGlass_validation_1 = require("./eyeGlass.validation");
const eyeGlass_controller_1 = require("./eyeGlass.controller");
const router = (0, express_1.Router)();
router.post("/create-eye-glass", (0, auth_1.default)(), (0, checkValidation_1.default)(eyeGlass_validation_1.eyeGlassValidationSchemas.createEyeGlassSchema), eyeGlass_controller_1.EyeGlassControllers.createEyeGlass);
router.delete("/", (0, auth_1.default)(), eyeGlass_controller_1.EyeGlassControllers.deleteEyeGlassById);
router.delete("/delete-all", (0, auth_1.default)(), eyeGlass_controller_1.EyeGlassControllers.deleteAllEyeGlasses);
router.put("/:eyeGlassId", (0, auth_1.default)(), (0, checkValidation_1.default)(eyeGlass_validation_1.eyeGlassValidationSchemas.updateEyeGlassSchema), eyeGlass_controller_1.EyeGlassControllers.updateEyeGlassById);
router.get("/", (0, auth_1.default)(), eyeGlass_controller_1.EyeGlassControllers.getAllEyeGlasses);
router.get("/:eyeGlassId", (0, auth_1.default)(), eyeGlass_controller_1.EyeGlassControllers.getEyeGlassById);
exports.EyeGlassRoutes = router;
