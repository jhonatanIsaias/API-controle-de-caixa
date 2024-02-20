import { Collection, ObjectId } from 'mongodb';
import { Entrada } from '../../server/interfaces/Entrada';
import { Db } from 'mongodb';

export class EntradaCollection {
  private collection: Collection<Entrada>;

  constructor(db: Db) {
    this.collection = db.collection<Entrada>('entradas');
  }

  async saveEntrada(entrada: Entrada): Promise<ObjectId> {
    const result = await this.collection.insertOne(entrada);

    return result.insertedId;
  }
  async findEntradaByDescription(description: string, company_id: ObjectId) {
    try {
      const entrada = await this.collection
        .find({
          description: description,
          company_id: company_id,
        })
        .toArray();
      return entrada;
    } catch (error) {
      throw Error('entrada não encontrada' + error);
    }
  }
  async findAllEntradaByDate(
    month: number,
    year: number,
    company_id: ObjectId,
  ) {
    try {
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
      return entradas;
    } catch (error) {
      throw Error('entrada não encontrada' + error);
    }
  }
}
