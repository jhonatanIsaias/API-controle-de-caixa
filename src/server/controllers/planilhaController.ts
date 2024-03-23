import { generatespreadsheet } from '../services/planilhaService.';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
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
      setTimeout(() => {
        fs.unlinkSync(path.resolve('temp', `planilha${month}-${year}.xlsx`));
      }, 5000);
      return;
    } catch (error) {
      res.send().json({ error: error.message });
      return;
    }
  }
}
