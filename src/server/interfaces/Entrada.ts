import * as yup from 'yup';
import { ObjectId } from 'mongodb';

export class Entrada {
  private entrada_id: ObjectId;
  private date: Date;
  private value: number;
  private description: string;
  private company_id: ObjectId;
  constructor(
    entrada_id: ObjectId,
    date: string,
    value: number,
    description: string,
    company_id: ObjectId,
  ) {
    this.entrada_id = entrada_id;
    this.date = new Date(date);
    this.value = value;
    this.description = description;
    this.company_id = company_id;
  }

  getentrada_id(): ObjectId {
    return this.entrada_id;
  }

  setentrada_id(entrada: ObjectId) {
    this.entrada_id = entrada;
  }

  getdate(): Date {
    return this.date;
  }

  setdate(date: string) {
    this.date = new Date(date);
  }

  getvalue(): number {
    return this.value;
  }

  setvalue(value: number) {
    this.value = value;
  }

  getdescription(): string {
    return this.description;
  }

  setdescription(description: string) {
    this.description = description;
  }

  getCompany(): ObjectId {
    return this.company_id;
  }

  setCompany(company_id: ObjectId) {
    this.company_id = company_id;
  }
}
export const bodyEntradaValidation: yup.Schema = yup.object().shape({
  date: yup.string().required(),
  value: yup.number().required(),
  description: yup.string().required(),
  company_id: yup.string().required(),
});
