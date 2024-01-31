import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import checkValidation from "../../middlewares/checkValidation";
import { authValidationSchemas } from "./auth.validation";

const router = Router();

router.use(
    "/login",
    checkValidation(authValidationSchemas.authLoginValidationSchema),
    AuthControllers.loginUser,
);

export const AuthRoutes = router;
