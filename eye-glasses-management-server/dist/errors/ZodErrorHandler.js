"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ZodErrorHanlder = (error) => {
    let errorMessages = "";
    error.issues.forEach((issue, index) => {
        errorMessages += `${index !== 0 ? " " : ""}${issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1]} is required.`;
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessage: errorMessages,
        errorDetails: error,
    };
};
exports.default = ZodErrorHanlder;
