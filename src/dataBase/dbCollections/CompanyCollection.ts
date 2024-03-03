import { Collection, ObjectId } from 'mongodb';
import { Company } from '../../server/interfaces/Comany';
import { compare } from 'bcrypt';

export class ComanyCollection {
  private collection: Collection<Company>;

  constructor(db: import('mongodb').Db) {
    this.collection = db.collection<Company>('companies');
  }

  async saveCompany(company: Company): Promise<ObjectId> {
    const result = await this.collection.insertOne(company);

    return result.insertedId;
  }
  async findCompanyByCnpj(cnpj: string) {
    const result = await this.collection
      .find({
        cnpj: cnpj,
      })
      .toArray();
    if (result != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any;
    }
    return null;
  }
  async autenticationComany(cnpj: string, password: string) {
    const result = await this.findCompanyByCnpj(cnpj);
    let isValid = false;

    if (result != null) {
      isValid = await compare(password, result[0].password);
    } else {
      throw new Error('cnpj não encontrado');
    }

    if (!isValid) {
      throw new Error('senha incorreta');
    }
    return result[0]._id;
  }
}
