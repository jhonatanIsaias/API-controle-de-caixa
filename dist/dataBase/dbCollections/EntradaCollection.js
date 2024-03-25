"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntradaCollection = void 0;
class EntradaCollection {
    constructor(db) {
        this.collection = db.collection('entradas');
    }
    async saveEntrada(entrada) {
        const result = await this.collection.insertOne(entrada);
        return result.insertedId;
    }
    async findEntradaByDescription(description, company_id) {
        try {
            const entrada = await this.collection
                .find({
                description: description,
                company_id: company_id,
            })
                .toArray();
            return entrada;
        }
        catch (error) {
            throw Error('entrada não encontrada' + error);
        }
    }
    async findAllEntradaByDate(month, year, company_id) {
        const startDate = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = new Date(year, month - 1, lastDay);
        const entradas = await this.collection
            .find({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
            company_id: company_id,
        })
            .toArray();
        if (entradas.length !== 0) {
            return entradas;
        }
        else {
            throw new Error('entrada não encontrada');
        }
    }
    async deleteEntradaById(id) {
        const entrada = await this.collection.findOne({
            _id: id,
        });
        if (entrada) {
            await this.collection.deleteOne(entrada);
        }
        else {
            throw new Error('entrada não encontrada');
        }
    }
}
exports.EntradaCollection = EntradaCollection;
//# sourceMappingURL=EntradaCollection.js.map