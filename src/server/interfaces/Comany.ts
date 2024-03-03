import * as yup from 'yup';

export class Company {
  constructor(
    private name: string,
    private password: string,
    private cnpj: string,
  ) {}

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
  setCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }
}
export const bodyCompanyValidator: yup.Schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required().min(6),
  cnpj: yup.string().required(),
});
