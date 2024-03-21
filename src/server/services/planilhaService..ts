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
      'data',
      'descrição entrada',
      'entrada',
      'descrição saída',
      'saída',
      'total',
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
      worksheet.getCell(`D${cont}`).value = dadoSaida.description;
      worksheet.getCell(`E${cont}`).value = valorNumerico; // Coluna 'descrição Saida'
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
    worksheet.getColumn(5).numFmt = '"R$"#,##0.00';
    worksheet.getColumn(6).numFmt = '"R$"#,##0.00';
    worksheet.getCell(`C${lastRow.number + 1}`).value = {
      formula: `SUM(C2:C${lastRow.number})`,
    };
    worksheet.mergeCells(`C${lastRow.number + 1}:C${lastRow.number + 2}`);
    worksheet.mergeCells(`B${lastRow.number + 1}:B${lastRow.number + 2}`);
    worksheet.getCell(`B${lastRow.number + 1}`).value = 'total';
    worksheet.getCell(`B${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    worksheet.mergeCells(`A${lastRow.number + 1}:A${lastRow.number + 2}`);
    worksheet.getCell(`A${lastRow.number + 1}`).fill = {
      type: 'pattern',
      pattern: 'darkVertical',
      fgColor: { argb: '0000' },
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`B${lastRow.number + 1}`).alignment = {
      vertical: 'middle',
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
    worksheet.getCell(`E${lastRow.number + 1}`).value = {
      formula: `SUM(E2:E${lastRow.number})`,
    };
    worksheet.mergeCells(`D${lastRow.number + 1}:D${lastRow.number + 2}`);
    worksheet.mergeCells(`E${lastRow.number + 1}:E${lastRow.number + 2}`);
    worksheet.getCell(`D${lastRow.number + 1}`).value = 'total';
    worksheet.getCell(`E${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`D${lastRow.number + 1}`).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getCell(`D${lastRow.number + 1}`).font = {
      bold: true,
      size: 18,
    };
    // set cell alignment to top-left, middle-center, bottom-righ
    worksheet.getCell(`E${lastRow.number + 1}`).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getColumn('A').width = 20; // Largura da coluna 'data'
    worksheet.getColumn('B').width = 20; // Largura da coluna 'entrada'
    worksheet.getColumn('C').width = 20; // Largura da coluna 'descrição Entrada'
    worksheet.getColumn('D').width = 20; // Espaçamento
    worksheet.getColumn('E').width = 20; // Largura da coluna 'data'
    worksheet.getColumn('F').width = 20; // Largura da coluna 'data'

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
    worksheet.getCell('H6').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    worksheet.getCell('H8').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    worksheet.mergeCells(`H6:I7`);
    worksheet.mergeCells(`H8:I9`);
    worksheet.getCell('H6').value = 'TOTAL GERAL';
    worksheet.getCell('H6').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getCell('H8').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getCell('H8').value = {
      formula: `C${lastRow.number + 1} - E${lastRow.number + 1}`,
    };
    worksheet.getCell('F2').value = {
      formula: `C2 - E2`,
      shareType: 'shared',
      ref: `F2:f${lastRow.number}`,
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
