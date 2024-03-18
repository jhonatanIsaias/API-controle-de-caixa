import * as yup from 'yup';
import { ObjectId } from 'mongodb';

export class Saida {
  private date: Date;
  private value: number;
  private description: string;
  private company_id: ObjectId;
  constructor(
    date: string,
    value: number,
    description: string,
    company_id: string,
  ) {
    this.date = Saida.converterDate(date);
    this.value = value;
    this.description = description;
    this.company_id = new ObjectId(company_id);
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
  static converterDate(date: string): Date {
    const iso = new Date(date);
    return iso;
  }
}
export const bodySaidaValidation: yup.Schema = yup.object().shape({
  date: yup.string().required(),
  value: yup.number().required(),
  description: yup.string().required(),
  _id: yup.string().required(),
});
