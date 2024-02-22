import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { entradaCollection } from '../server';
import { Entrada, bodyEntradaValidator } from '../interfaces/Entrada';
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
      return res.status(StatusCodes.OK).json(entradas);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send('entrada não encontrada');
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
      return res.status(StatusCodes.OK).json(entradas);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send('entrada não encontrada');
    }
  }
  async deleteEntradaById(req: Request, res: Response) {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    try {
      await entradaCollection.deleteEntradaById(objectId);
      return res.status(StatusCodes.OK).send('entrada deletada com sucesso');
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).send('entrada');
    }
  }
}
export const validationEntrada = validation({
  body: bodyEntradaValidator,
});
