import { generatespreadsheet } from '../services/planilhaService.';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import path from 'path';
export class PlanilhaController {
  async generatespreadsheet(req: Request, res: Response) {
    try {
      const { month, year, _id } = req.params;
      await generatespreadsheet(
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
