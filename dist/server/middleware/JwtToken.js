"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateJWTToken = (company_id) => {
    const secret = process.env.JWT_SECRET || '';
    const expiresIn = process.env.JWT_EXPIRE;
    const algorithm = 'HS256';
    const token = (0, jsonwebtoken_1.sign)({ subject: company_id }, secret, {
        algorithm: algorithm,
        expiresIn: expiresIn,
    });
    return token;
};
exports.generateJWTToken = generateJWTToken;
const auth = (req, res, next) => {
    const auth = req.headers.authorization;
    const secret = process.env.JWT_SECRET || '';
    try {
        if (!auth) {
            throw new Error('JWT is missing');
        }
        const [, token] = auth.split(' ');
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        if (decoded) {
            return next();
        }
        throw new Error('JWT invalid');
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.auth = auth;
//# sourceMappingURL=JwtToken.js.map