"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSaida = exports.SaidaController = void 0;
const http_status_codes_1 = require("http-status-codes");
const server_1 = require("../server");
const Saida_1 = require("../interfaces/Saida");
const mongodb_1 = require("mongodb");
const validation_1 = require("../middleware/validation");
class SaidaController {
    async createSaida(req, res) {
        const { date, value, description, _id } = req.body;
        const saida = new Saida_1.Saida(date, value, description, _id);
        const result = await server_1.saidaCollection.saveSaida(saida);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(result).send();
    }
    async findSaidaByDescription(req, res) {
        const { description, comany_id } = req.params;
        const saidas = await server_1.saidaCollection.findSaidaByDescription(description, new mongodb_1.ObjectId(comany_id));
        if (saidas) {
            res.status(http_status_codes_1.StatusCodes.OK).json(saidas);
        }
        else {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('saida não encontrada');
        }
    }
    async findAllSaidaByDate(req, res) {
        const { month, year, _id } = req.params;
        try {
            const saidas = await server_1.saidaCollection.findAllSaidaByDate(parseInt(month), parseInt(year), new mongodb_1.ObjectId(_id));
            return res.status(http_status_codes_1.StatusCodes.OK).json(saidas);
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
    async deleteSaidaById(req, res) {
        const { id } = req.params;
        const objectId = new mongodb_1.ObjectId(id);
        try {
            await server_1.saidaCollection.deleteSaidaById(objectId);
            return res.status(http_status_codes_1.StatusCodes.OK).send('saida deletada com sucesso');
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('saida');
        }
    }
}
exports.SaidaController = SaidaController;
exports.validationSaida = (0, validation_1.validation)({
    body: Saida_1.bodySaidaValidation,
});
//# sourceMappingURL=SaidaController.js.map