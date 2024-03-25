"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCompany = exports.CompanyController = void 0;
const Comany_1 = require("../interfaces/Comany");
const validation_1 = require("../middleware/validation");
const http_status_codes_1 = require("http-status-codes");
const server_1 = require("../server");
const bcrypt_1 = require("bcrypt");
const JwtToken_1 = require("../middleware/JwtToken");
class CompanyController {
    async createCompany(req, res) {
        try {
            const passwordEncrypted = await (0, bcrypt_1.hash)(req.body.password, 8);
            req.body.password = passwordEncrypted;
            const result = await server_1.companyCollection.saveCompany(req.body);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(result).send();
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const company = await server_1.companyCollection.autenticationComany(email, password);
            const token = (0, JwtToken_1.generateJWTToken)(company._id);
            res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
                token: token,
                company_id: company._id,
                name: company.name,
                cnpj: company.cnpj,
            });
        }
        catch (error) {
            console.log(error);
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: error.message });
        }
    }
}
exports.CompanyController = CompanyController;
exports.validationCompany = (0, validation_1.validation)({
    body: Comany_1.bodyCompanyValidator,
});
//# sourceMappingURL=CompanyController.js.map