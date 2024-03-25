//@ts-nocheck
import { Request, Response } from 'express';
import { bodyCompanyValidator } from '../interfaces/Comany';
import { validation } from '../middleware/validation';
import { StatusCodes } from 'http-status-codes';
import { companyCollection } from '../server';
import { hash } from 'bcrypt';
import { generateJWTToken } from '../middleware/JwtToken';

export class CompanyController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createCompany(req: Request, res: Response) {
    try {
      const passwordEncrypted = await hash(req.body.password, 8);
      req.body.password = passwordEncrypted;
      const result = await companyCollection.saveCompany(req.body);
      return res.status(StatusCodes.CREATED).json(result).send();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const company = await companyCollection.autenticationComany(
        email,
        password,
      );
      // eslint-disable-next-line @typescript-eslint/ban-types
      const token = generateJWTToken(company._id);
      res.status(StatusCodes.ACCEPTED).json({
        token: token,
        company_id: company._id,
        name: company.name,
        cnpj: company.cnpj,
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.FORBIDDEN).json({ error: error.message });
    }
  }
}
export const validationCompany = validation({
  body: bodyCompanyValidator,
});
