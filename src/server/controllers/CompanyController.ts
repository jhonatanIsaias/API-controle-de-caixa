import { Request, Response } from 'express';
import { bodyCompanyValidator } from '../interfaces/Comany';
import { validation } from '../middleware/validation';
import { StatusCodes } from 'http-status-codes';
import { comanyCollection } from '../server';
import { hash } from 'bcrypt';
import { generateJWTToken } from '../middleware/JwtToken';

export class CompanyController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createCompany(req: Request, res: Response) {
    const passwordEncrypted = await hash(req.body.password, 8);
    req.body.password = passwordEncrypted;
    const result = await comanyCollection.saveCompany(req.body);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
  async login(req: Request, res: Response) {
    const { cnpj, password } = req.body;
    try {
      const comanyId = await comanyCollection.autenticationComany(
        cnpj,
        password,
      );
      const token = generateJWTToken(comanyId);
      res.status(StatusCodes.ACCEPTED).json({ token: token });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.FORBIDDEN).send(`${error}`);
    }
  }
}
export const validationCompany = validation({
  body: bodyCompanyValidator,
});
