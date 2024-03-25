"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEntrada = exports.EntradaController = void 0;
const http_status_codes_1 = require("http-status-codes");
const server_1 = require("../server");
const Entrada_1 = require("../interfaces/Entrada");
const mongodb_1 = require("mongodb");
const validation_1 = require("../middleware/validation");
class EntradaController {
    async createEntrada(req, res) {
        const { date, value, description, _id } = req.body;
        const entrada = new Entrada_1.Entrada(date, value, description, _id);
        const result = await server_1.entradaCollection.saveEntrada(entrada);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(result).send();
    }
    async findEntradaByDescription(req, res) {
        const { description, _id } = req.params;
        const entradas = await server_1.entradaCollection.findEntradaByDescription(description, new mongodb_1.ObjectId(_id));
        if (entradas) {
            return res.status(http_status_codes_1.StatusCodes.OK).json(entradas);
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send('entrada não encontrada');
        }
    }
    async findAllEntradaByDate(req, res) {
        const { month, year, _id } = req.params;
        try {
            const entradas = await server_1.entradaCollection.findAllEntradaByDate(parseInt(month), parseInt(year), new mongodb_1.ObjectId(_id));
            return res.status(http_status_codes_1.StatusCodes.OK).json(entradas);
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: error.message });
        }
    }
    async deleteEntradaById(req, res) {
        const { id } = req.params;
        const objectId = new mongodb_1.ObjectId(id);
        try {
            await server_1.entradaCollection.deleteEntradaById(objectId);
            return res.status(http_status_codes_1.StatusCodes.OK).send('entrada deletada com sucesso');
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(`${error}`);
        }
    }
}
exports.EntradaController = EntradaController;
exports.validationEntrada = (0, validation_1.validation)({
    body: Entrada_1.bodyEntradaValidator,
});
//# sourceMappingURL=EntradaController.js.map