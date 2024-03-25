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
exports.validationId = exports.validationDescription = exports.validation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const validation = (schemas) => async (req, res, next) => {
    const errorsResult = {};
    const arraySchemas = Object.entries(schemas);
    arraySchemas.forEach((schema) => {
        try {
            schema[1].validateSync(req[schema[0]], {
                abortEarly: false,
            });
        }
        catch (error) {
            const yupError = error;
            const validationErrors = {};
            yupError.inner.forEach((error) => {
                if (!error.path)
                    return;
                validationErrors[error.path] = error.message;
            });
            errorsResult[schema[0]] = validationErrors;
        }
    });
    if (Object.entries(errorsResult).length === 0) {
        return next();
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
};
exports.validation = validation;
exports.validationDescription = (0, exports.validation)({
    params: yup.object().shape({
        description: yup.string().required(),
        _id: yup.string().required().min(24),
    }),
});
exports.validationId = (0, exports.validation)({
    params: yup.object().shape({
        _id: yup.string().required().min(24),
    }),
});
//# sourceMappingURL=validation.js.map