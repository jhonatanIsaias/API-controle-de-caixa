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
}
