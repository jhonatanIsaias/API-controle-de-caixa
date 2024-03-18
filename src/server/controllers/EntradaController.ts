import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { entradaCollection } from '../server';
import { Entrada, bodyEntradaValidator } from '../interfaces/Entrada';
import { ObjectId } from 'mongodb';
import { validation } from '../middleware/validation';
import path from 'path';
export class EntradaController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createEntrada(req: Request, res: Response) {
    const { date, value, description, _id } = req.body;
    const entrada = new Entrada(date, value, description, _id);
    const result = await entradaCollection.saveEntrada(entrada);
    return res.status(StatusCodes.CREATED).json(result).send();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findEntradaByDescription(req: Request, res: Response) {
    const { description, _id } = req.params;

    const entradas = await entradaCollection.findEntradaByDescription(
      description,
      new ObjectId(_id),
    );
    if (entradas) {
      return res.status(StatusCodes.OK).json(entradas);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send('entrada não encontrada');
    }
  }
  async findAllEntradaByDate(req: Request, res: Response) {
    const { month, year, _id } = req.params;
    try {
      const entradas = await entradaCollection.findAllEntradaByDate(
        parseInt(month),
        parseInt(year),
        new ObjectId(_id),
      );
      return res.status(StatusCodes.OK).json(entradas);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  }
  async deleteEntradaById(req: Request, res: Response) {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    try {
      await entradaCollection.deleteEntradaById(objectId);
      return res.status(StatusCodes.OK).send('entrada deletada com sucesso');
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).send(`${error}`);
    }
  }
  async generatespreadsheet(req: Request, res: Response) {
    try {
      const { month, year, _id } = req.params;
      await entradaCollection.generatespreadsheet(
        parseInt(month),
        parseInt(year),
        new ObjectId(_id),
      );
      res.download(path.resolve('temp', `planilha${month}-${year}.xlsx`));
      return;
    } catch (error) {
      res.send().json({ error: error.message });
      return;
    }
  }
}
export const validationEntrada = validation({
  body: bodyEntradaValidator,
});
