import * as yup from 'yup';
export class Company {
  constructor(
    private comany_id: string,
    private name: string,
    private password: string,
    private cnpj: string,
  ) {}

  getComany_id(): string {
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

  setComany_id(comany_id: string): void {
    this.comany_id = comany_id;
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
  comany_id: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required().min(6),
  cnpj: yup.string().required(),
});
