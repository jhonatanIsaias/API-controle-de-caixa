import { Collection, ObjectId } from 'mongodb';
import { Entrada } from '../../server/interfaces/Entrada';
import { Db } from 'mongodb';
//import { Workbook } from 'exceljs';
//import * as path from 'path';
export class EntradaCollection {
  private collection: Collection<Entrada>;

  constructor(db: Db) {
    this.collection = db.collection<Entrada>('entradas');
  }

  async saveEntrada(entrada: Entrada): Promise<ObjectId> {
    const result = await this.collection.insertOne(entrada);

    return result.insertedId;
  }
  async findEntradaByDescription(description: string, company_id: ObjectId) {
    try {
      const entrada = await this.collection
        .find({
          description: description,
          company_id: company_id,
        })
        .toArray();
      return entrada;
    } catch (error) {
      throw Error('entrada não encontrada' + error);
    }
  }
  async findAllEntradaByDate(
    month: number,
    year: number,
    company_id: ObjectId,
  ) {
    const startDate = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = new Date(year, month - 1, lastDay);
    const entradas = await this.collection
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
        company_id: company_id,
      })
      .toArray();
    if (entradas.length !== 0) {
      return entradas;
    } else {
      throw new Error('entrada não encontrada');
    }
  }
  async deleteEntradaById(id: ObjectId) {
    const entrada = await this.collection.findOne({
      _id: id,
    });
    if (entrada) {
      await this.collection.deleteOne(entrada);
    } else {
      throw new Error('entrada não encontrada');
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  /* async generatespreadsheet(month: number, year: number, company_id: ObjectId) {
    try {
      const dados = await this.findAllEntradaByDate(month, year, company_id);
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('planilha de entradas');
      worksheet.addRow(['data', 'valor', 'descrição']);
      dados.forEach((dado) => {
        worksheet.addRow([dado.date, dado.value, dado.description]);
      });
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Adicionando bordas
      const lastRow = worksheet.lastRow;
      if (lastRow === undefined) {
        return;
      }

      // Cálculo do total
      const totalRow = worksheet.addRow([
        'Total',
        { formula: `SUM(B2:B${lastRow.number})` },
        '',
      ]);
      totalRow.getCell(1).font = { bold: true };

      const caminhoArquivo = path.resolve(
        'temp',
        `planilha${month}-${year}.xlsx`,
      );
      await workbook.xlsx.writeFile(caminhoArquivo);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }*/
}
