import { Request, Response } from 'express';
import { bodyEntradaValidation } from '../interfaces/Entrada';
import { validation } from '../middleware/validation';
import { StatusCodes } from 'http-status-codes';
import { entradaCollection } from '../server';
import { Entrada } from '../interfaces/Entrada';

export class EntradaController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createEntrada(req: Request<{}, {}, Entrada>, res: Response) {
    const result = await entradaCollection.saveEntrada(req.body);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
}
export const validationEntrada = validation({
  body: bodyEntradaValidation,
});
