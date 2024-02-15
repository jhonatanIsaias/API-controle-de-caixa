import { Request, Response } from 'express';
import { Company } from '../interfaces/Comany';
import { bodyCompanyValidator } from '../interfaces/Comany';
import { validation } from '../middleware/validation';
import { StatusCodes } from 'http-status-codes';
import { comanyCollection } from '../server';

export class CompanyController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createCompany(req: Request<{}, {}, Company>, res: Response) {
    const result = await comanyCollection.saveCompany(req.body);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
}
export const validationCompany = validation({
  body: bodyCompanyValidator,
});
