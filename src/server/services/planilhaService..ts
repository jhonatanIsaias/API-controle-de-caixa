import { Workbook } from 'exceljs';
import { entradaCollection, saidaCollection } from '../server';
import * as path from 'path';
import { ObjectId } from 'mongodb';
export const generatespreadsheet = async (
  month: number,
  year: number,
  company_id: ObjectId,
) => {
  try {
    const dadosEntrada = await entradaCollection.findAllEntradaByDate(
      month,
      year,
      company_id,
    );
    const dadosSaida = await saidaCollection.findAllSaidaByDate(
      month,
      year,
      company_id,
    );

    dadosEntrada.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    dadosSaida.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('planilha de entradas e saidas');
    worksheet.addRow([
      'data entrada',
      'descrição entrada',
      'entrada',
      'data saída',
      'descrição saída',
      'saída',
    ]);
    let cont = 2;
    dadosEntrada.forEach((dadoEntrada) => {
      const valorNumerico = Number(dadoEntrada.value);
      worksheet.addRow([
        dadoEntrada.date,
        dadoEntrada.description,
        valorNumerico,
      ]);
    });

    dadosSaida.forEach((dadoSaida) => {
      const valorNumerico = Number(dadoSaida.value);
      worksheet.getCell(`D${cont}`).value = dadoSaida.date; // Coluna 'saida'
      worksheet.getCell(`E${cont}`).value = dadoSaida.description;
      worksheet.getCell(`F${cont}`).value = valorNumerico; // Coluna 'descrição Saida'
      cont++; // Avançando para a próxima linha
    });
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    //redenrizando entradas
    const lastRow = worksheet.lastRow;
    if (lastRow === undefined) {
      return;
    }
    worksheet.getColumn(3).numFmt = '"R$"#,##0.00';
    worksheet.getColumn(6).numFmt = '"R$"#,##0.00';
    worksheet.getCell(`C${lastRow.number + 1}`).value = {
      formula: `SUM(C2:C${lastRow.number})`,
    };
    worksheet.mergeCells(`C${lastRow.number + 1}:C${lastRow.number + 2}`);
    worksheet.mergeCells(`A${lastRow.number + 1}:B${lastRow.number + 2}`);
    worksheet.getCell(`A${lastRow.number + 1}`).value = 'total';
    worksheet.getCell(`A${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`A${lastRow.number + 1}`).alignment = {
      vertical: 'justify',
      horizontal: 'center',
    };
    worksheet.getCell(`C${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`C${lastRow.number + 1}`).alignment = {
      vertical: 'justify',
      horizontal: 'center',
    };
    //rederizando saidas
    worksheet.getCell(`F${lastRow.number + 1}`).value = {
      formula: `SUM(F2:F${lastRow.number})`,
    };
    worksheet.mergeCells(`F${lastRow.number + 1}:F${lastRow.number + 2}`);
    worksheet.mergeCells(`D${lastRow.number + 1}:E${lastRow.number + 2}`);
    worksheet.getCell(`D${lastRow.number + 1}`).value = 'total';
    worksheet.getCell(`D${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`D${lastRow.number + 1}`).alignment = {
      vertical: 'justify',
      horizontal: 'center',
    };
    worksheet.getCell(`F${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`F${lastRow.number + 1}`).alignment = {
      vertical: 'justify',
      horizontal: 'center',
    };
    worksheet.getColumn('A').width = 20; // Largura da coluna 'data'
    worksheet.getColumn('B').width = 20; // Largura da coluna 'entrada'
    worksheet.getColumn('C').width = 20; // Largura da coluna 'descrição Entrada'
    worksheet.getColumn('D').width = 20; // Espaçamento
    worksheet.getColumn('E').width = 20; // Largura da coluna 'data'
    worksheet.getColumn('F').width = 25; // Largura da coluna 'saida'
    worksheet.getColumn('G').width = 20;

    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    worksheet.getColumn('A').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCEEFF' }, // Verde claro
    };
    worksheet.getColumn('B').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCEEFF' }, // Verde claro
    };
    worksheet.getColumn('C').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCEEFF' }, // Verde claro
    };
    worksheet.getColumn('D').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFCCCC' }, // Vermelho claro
    };
    worksheet.getColumn('E').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFCCCC' }, // Vermelho claro
    };
    worksheet.getColumn('F').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFCCCC' }, // Vermelho claro
    };

    const caminhoArquivo = path.resolve(
      'temp',
      `planilha${month}-${year}.xlsx`,
    );
    await workbook.xlsx.writeFile(caminhoArquivo);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
