import { Request, Response } from 'express';
import { Company } from '../interfaces/Comany';
import { bodyCompanyValidator } from '../interfaces/Comany';
import { validation } from '../middleware/validation';
import { StatusCodes } from 'http-status-codes';

export class CompanyController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createCompany(req: Request<{}, {}, Company>, res: Response) {
    return res.status(StatusCodes.CREATED).send('comapany criada');
  }
}
export const validationCompany = validation({
  body: bodyCompanyValidator,
});
