import { Collection, ObjectId } from 'mongodb';
import { Saida } from '../../server/interfaces/Saida';
import { Db } from 'mongodb';

export class SaidaCollection {
  private collection: Collection<Saida>;

  constructor(db: Db) {
    this.collection = db.collection<Saida>('saidas');
  }

  async saveSaida(saida: Saida): Promise<ObjectId> {
    const result = await this.collection.insertOne(saida);

    return result.insertedId;
  }
  async findSaidaByDescription(description: string, company_id: ObjectId) {
    try {
      const saida = await this.collection
        .find({
          description: description,
          company_id: company_id,
        })
        .toArray();
      return saida;
    } catch (error) {
      throw Error('saida não encontrada' + error);
    }
  }
  async findAllSaidaByDate(month: number, year: number, company_id: ObjectId) {
    try {
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
      return saidas;
    } catch (error) {
      throw Error('saida não encontrada' + error);
    }
  }
  async deleteSaidaById(id: ObjectId) {
    const saida = await this.collection.findOne({
      _id: id,
    });
    if (saida) {
      await this.collection.deleteOne(saida);
    } else {
      throw new Error('saida não encontrada');
    }
  }
}
