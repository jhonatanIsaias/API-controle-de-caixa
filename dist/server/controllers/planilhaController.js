"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanilhaController = void 0;
const planilhaService_1 = require("../services/planilhaService.");
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class PlanilhaController {
    async generatespreadsheet(req, res) {
        try {
            const { month, year, _id } = req.params;
            await (0, planilhaService_1.generatespreadsheet)(parseInt(month), parseInt(year), new mongodb_1.ObjectId(_id));
            res.download(path_1.default.resolve('temp', `planilha${month}-${year}.xlsx`));
            setTimeout(() => {
                fs_1.default.unlinkSync(path_1.default.resolve('temp', `planilha${month}-${year}.xlsx`));
            }, 5000);
            return;
        }
        catch (error) {
            res.send().json({ error: error.message });
            return;
        }
    }
}
exports.PlanilhaController = PlanilhaController;
//# sourceMappingURL=planilhaController.js.map