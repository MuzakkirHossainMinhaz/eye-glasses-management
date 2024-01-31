import { Router } from "express";
import checkValidation from "../../middlewares/checkValidation";
import auth from "../../middlewares/auth";
import { eyeGlassValidationSchemas } from "./eyeGlass.validation";
import { EyeGlassControllers } from "./eyeGlass.controller";

const router = Router();

router.post(
    "/create-eye-glass",
    auth(),
    checkValidation(eyeGlassValidationSchemas.createEyeGlassSchema),
    EyeGlassControllers.createEyeGlass,
);
router.delete("/", auth(), EyeGlassControllers.deleteEyeGlassById);
router.delete("/delete-all", auth(), EyeGlassControllers.deleteAllEyeGlasses);
router.put(
    "/:eyeGlassId",
    auth(),
    checkValidation(eyeGlassValidationSchemas.updateEyeGlassSchema),
    EyeGlassControllers.updateEyeGlassById,
);
router.get("/", auth(), EyeGlassControllers.getAllEyeGlasses);
router.get("/:eyeGlassId", auth(), EyeGlassControllers.getEyeGlassById);

export const EyeGlassRoutes = router;
