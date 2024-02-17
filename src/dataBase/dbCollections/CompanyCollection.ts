import { Collection, ObjectId } from 'mongodb';
import { Company } from '../../server/interfaces/Comany';

export class ComanyCollection {
  private collection: Collection<Company>;

  constructor(db: import('mongodb').Db) {
    this.collection = db.collection<Company>('companies');
  }

  async saveCompany(company: Company): Promise<ObjectId> {
    const result = await this.collection.insertOne(company);

    return result.insertedId;
  }
}
