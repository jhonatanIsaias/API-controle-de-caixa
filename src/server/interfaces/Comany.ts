import * as yup from 'yup';
import { ObjectId } from 'mongodb';
export class Company {
  constructor(
    private comany_id: ObjectId,
    private name: string,
    private password: string,
    private cnpj: string,
  ) {}

  getComany_id(): ObjectId {
    return this.comany_id;
  }
  getName(): string {
    return this.name;
  }
  getPassword(): string {
    return this.password;
  }
  getCnpj(): string {
    return this.cnpj;
  }
  setName(name: string): void {
    this.name = name;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }
}
export const bodyCompanyValidator: yup.Schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required().min(6),
  cnpj: yup.string().required(),
});
