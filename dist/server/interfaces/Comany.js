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
exports.bodyCompanyValidator = exports.Company = void 0;
const yup = __importStar(require("yup"));
class Company {
    constructor(name, password, cnpj, email) {
        this.name = name;
        this.password = password;
        this.cnpj = cnpj;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getPassword() {
        return this.password;
    }
    getCnpj() {
        return this.cnpj;
    }
    setName(name) {
        this.name = name;
    }
    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }
    getEmail() {
        return this.email;
    }
    setEMail(email) {
        this.email = email;
    }
}
exports.Company = Company;
exports.bodyCompanyValidator = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required().min(6),
    cnpj: yup.string().required(),
    email: yup.string().required().email(),
});
//# sourceMappingURL=Comany.js.map