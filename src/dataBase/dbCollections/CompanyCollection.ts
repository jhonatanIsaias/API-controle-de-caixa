import { Collection, ObjectId } from 'mongodb';
import { Company } from '../../server/interfaces/Comany';
import { compare } from 'bcrypt';

export class ComanyCollection {
  private collection: Collection<Company>;

  constructor(db: import('mongodb').Db) {
    this.collection = db.collection<Company>('companies');
  }

  async saveCompany(company: Company): Promise<ObjectId> {
    const empresaCnpj = await this.findCompanyByCnpj(company.cnpj);
    const empresaEmail = await this.findCompanyByEmail(company.email);
    console.log(empresaCnpj);
    if (empresaCnpj !== null) {
      if (empresaCnpj.cnpj === company.cnpj) {
        throw new Error('empresa já cadastrada');
      }
    }
    if (empresaEmail !== null) {
      if (empresaEmail.email === company.email) {
        throw new Error('empresa já cadastrada com esse email');
      }
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
    const result = await this.collection.findOne({
      email: email,
    });
    return result;
  }
  async autenticationComany(email: string, password: string) {
    const result = await this.findCompanyByEmail(email);
    let isValid = false;

    if (result != null) {
      isValid = await compare(password, result.password);
    } else {
      throw new Error('cnpj não encontrado');
    }

    if (!isValid) {
      throw new Error('senha incorreta');
    }
    return {
      _id: result._id,
      name: result.name,
      cnpj: result.cnpj,
    };
  }
}
