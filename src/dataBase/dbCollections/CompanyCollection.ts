import { Collection, ObjectId } from 'mongodb';
import { Company } from '../../server/interfaces/Comany';
import { compare } from 'bcrypt';

export class ComanyCollection {
  private collection: Collection<Company>;

  constructor(db: import('mongodb').Db) {
    this.collection = db.collection<Company>('companies');
  }

  async saveCompany(company: Company): Promise<ObjectId> {
    const cnpj = await this.findCompanyByCnpj(company.cnpj);
    console.log(cnpj);
    if (cnpj !== null) {
      throw new Error('empresa já cadastrada');
    }
    const result = await this.collection.insertOne(company);

    return result.insertedId;
  }
  async findCompanyByCnpj(cnpj: string) {
    const result = await this.collection.findOne({
      cnpj: cnpj,
    });
    return result;
  }
  async findCompanyByEmail(email: string) {
    const result = await this.collection
      .find({
        email: email,
      })
      .toArray();
    if (result != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any;
    }
    return null;
  }
  async autenticationComany(email: string, password: string) {
    const result = await this.findCompanyByEmail(email);
    let isValid = false;

    if (result != null) {
      isValid = await compare(password, result[0].password);
    } else {
      throw new Error('cnpj não encontrado');
    }

    if (!isValid) {
      throw new Error('senha incorreta');
    }
    return {
      _id: result[0]._id,
      name: result[0].name,
      cnpj: result[0].cnpj,
    };
  }
}
