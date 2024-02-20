import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { entradaCollection } from '../server';
import { Entrada, bodyEntradaValidation } from '../interfaces/Entrada';
import { ObjectId } from 'mongodb';
import { validation } from '../middleware/validation';
export class EntradaController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createEntrada(req: Request, res: Response) {
    const { date, value, description, company_id } = req.body;
    const entrada = new Entrada(date, value, description, company_id);
    const result = await entradaCollection.saveEntrada(entrada);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findEntradaByDescription(req: Request, res: Response) {
    const { description, comany_id } = req.params;

    const entradas = await entradaCollection.findEntradaByDescription(
      description,
      new ObjectId(comany_id),
    );
    if (entradas) {
      res.status(StatusCodes.OK).json(entradas);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('entrada não encontrada');
    }
  }
  async findAllEntradaByDate(req: Request, res: Response) {
    const { month, year, comany_id } = req.params;

    const entradas = await entradaCollection.findAllEntradaByDate(
      parseInt(month),
      parseInt(year),
      new ObjectId(comany_id),
    );
    if (entradas) {
      res.status(StatusCodes.OK).json(entradas);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('entrada não encontrada');
    }
  }
}
export const validationEntrada = validation({
  body: bodyEntradaValidation,
});
