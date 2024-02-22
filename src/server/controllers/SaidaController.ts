import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { saidaCollection } from '../server';
import { Saida, bodySaidaValidation } from '../interfaces/Saida';
import { ObjectId } from 'mongodb';
import { validation } from '../middleware/validation';
export class SaidaController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createSaida(req: Request, res: Response) {
    const { date, value, description, company_id } = req.body;
    const saida = new Saida(date, value, description, company_id);
    const result = await saidaCollection.saveSaida(saida);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findSaidaByDescription(req: Request, res: Response) {
    const { description, comany_id } = req.params;

    const saidas = await saidaCollection.findSaidaByDescription(
      description,
      new ObjectId(comany_id),
    );
    if (saidas) {
      res.status(StatusCodes.OK).json(saidas);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('saida não encontrada');
    }
  }
  async findAllSaidaByDate(req: Request, res: Response) {
    const { month, year, comany_id } = req.params;

    const saidas = await saidaCollection.findAllSaidaByDate(
      parseInt(month),
      parseInt(year),
      new ObjectId(comany_id),
    );
    if (saidas) {
      res.status(StatusCodes.OK).json(saidas);
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('saida não encontrada');
    }
  }
  async deleteSaidaById(req: Request, res: Response) {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    try {
      await saidaCollection.deleteSaidaById(objectId);
      return res.status(StatusCodes.OK).send('saida deletada com sucesso');
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).send('saida');
    }
  }
}
export const validationSaida = validation({
  body: bodySaidaValidation,
});
