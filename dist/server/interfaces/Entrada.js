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
exports.bodyEntradaValidator = exports.Entrada = void 0;
const mongodb_1 = require("mongodb");
const yup = __importStar(require("yup"));
class Entrada {
    constructor(date, value, description, company_id) {
        this.date = Entrada.converterDate(date);
        this.value = value;
        this.description = description;
        this.company_id = new mongodb_1.ObjectId(company_id);
    }
    getdate() {
        return this.date;
    }
    setdate(date) {
        this.date = new Date(date);
    }
    getvalue() {
        return this.value;
    }
    setvalue(value) {
        this.value = value;
    }
    getdescription() {
        return this.description;
    }
    setdescription(description) {
        this.description = description;
    }
    getCompany() {
        return this.company_id;
    }
    setCompany(company_id) {
        this.company_id = company_id;
    }
    static converterDate(date) {
        const iso = new Date(date);
        return iso;
    }
}
exports.Entrada = Entrada;
exports.bodyEntradaValidator = yup.object().shape({
    date: yup.string().required(),
    value: yup.number().required(),
    description: yup.string().required(),
    _id: yup.string().required(),
});
//# sourceMappingURL=Entrada.js.map