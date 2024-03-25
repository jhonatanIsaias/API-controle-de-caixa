"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaidaCollection = void 0;
class SaidaCollection {
    constructor(db) {
        this.collection = db.collection('saidas');
    }
    async saveSaida(saida) {
        const result = await this.collection.insertOne(saida);
        return result.insertedId;
    }
    async findSaidaByDescription(description, company_id) {
        try {
            const saida = await this.collection
                .find({
                description: description,
                company_id: company_id,
            })
                .toArray();
            return saida;
        }
        catch (error) {
            throw Error('saida não encontrada' + error);
        }
    }
    async findAllSaidaByDate(month, year, company_id) {
        const startDate = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = new Date(year, month - 1, lastDay);
        const saidas = await this.collection
            .find({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
            company_id: company_id,
        })
            .toArray();
        if (saidas.length !== 0) {
            return saidas;
        }
        else {
            throw new Error('saidas não encontradas');
        }
    }
    async deleteSaidaById(id) {
        const saida = await this.collection.findOne({
            _id: id,
        });
        if (saida) {
            await this.collection.deleteOne(saida);
        }
        else {
            throw new Error('saida não encontrada');
        }
    }
}
exports.SaidaCollection = SaidaCollection;
//# sourceMappingURL=SaidaCollection.js.map