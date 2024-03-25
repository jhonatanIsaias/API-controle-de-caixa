"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComanyCollection = void 0;
const bcrypt_1 = require("bcrypt");
class ComanyCollection {
    constructor(db) {
        this.collection = db.collection('companies');
    }
    async saveCompany(company) {
        const empresaCnpj = await this.findCompanyByCnpj(company.cnpj);
        const empresaEmail = await this.findCompanyByEmail(company.email);
        console.log(empresaCnpj);
        if (empresaCnpj !== null) {
            if (empresaCnpj.cnpj === company.cnpj) {
                throw new Error('empresa já cadastrada');
            }
        }
        if (empresaEmail !== null) {
            if (empresaEmail.email === company.email) {
                throw new Error('empresa já cadastrada com esse email');
            }
        }
        const result = await this.collection.insertOne(company);
        return result.insertedId;
    }
    async findCompanyByCnpj(cnpj) {
        const result = await this.collection.findOne({
            cnpj: cnpj,
        });
        return result;
    }
    async findCompanyByEmail(email) {
        const result = await this.collection.findOne({
            email: email,
        });
        return result;
    }
    async autenticationComany(email, password) {
        const result = await this.findCompanyByEmail(email);
        let isValid = false;
        if (result != null) {
            isValid = await (0, bcrypt_1.compare)(password, result.password);
        }
        else {
            throw new Error('cnpj não encontrado');
        }
        if (!isValid) {
            throw new Error('senha incorreta');
        }
        return {
            _id: result._id,
            name: result.name,
            cnpj: result.cnpj,
        };
    }
}
exports.ComanyCollection = ComanyCollection;
//# sourceMappingURL=CompanyCollection.js.map