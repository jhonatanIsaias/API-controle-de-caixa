"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatespreadsheet = void 0;
const exceljs_1 = require("exceljs");
const server_1 = require("../server");
const path = __importStar(require("path"));
const generatespreadsheet = async (month, year, company_id) => {
    try {
        const dadosEntrada = await server_1.entradaCollection.findAllEntradaByDate(month, year, company_id);
        const dadosSaida = await server_1.saidaCollection.findAllSaidaByDate(month, year, company_id);
        dadosEntrada.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        dadosSaida.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        const workbook = new exceljs_1.Workbook();
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
            worksheet.getCell(`E${cont}`).value = valorNumerico;
            cont++;
        });
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
        });
        const lastRow = worksheet.lastRow;
        if (lastRow === undefined) {
            return;
        }
        worksheet.getColumn(3).numFmt = '"R$"#,##0.00';
        worksheet.getColumn(5).numFmt = '"R$"#,##0.00';
        worksheet.getColumn(6).numFmt = '"R$"#,##0.00';
        worksheet.getColumn(8).numFmt = '"R$"#,##0.00';
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
        worksheet.mergeCells(`F${lastRow.number + 1}:F${lastRow.number + 2}`);
        worksheet.getCell(`F${lastRow.number + 1}`).fill = {
            type: 'pattern',
            pattern: 'darkVertical',
            fgColor: { argb: '0000' },
        };
        worksheet.getCell(`B${lastRow.number + 1}`).alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };
        worksheet.getCell(`C${lastRow.number + 1}`).font = {
            bold: true,
            size: 18,
        };
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
        worksheet.getCell(`D${lastRow.number + 1}`).alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };
        worksheet.getCell(`D${lastRow.number + 1}`).font = {
            bold: true,
            size: 18,
        };
        worksheet.getCell(`E${lastRow.number + 1}`).alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };
        worksheet.getColumn('A').width = 20;
        worksheet.getColumn('B').width = 20;
        worksheet.getColumn('C').width = 20;
        worksheet.getColumn('D').width = 20;
        worksheet.getColumn('E').width = 20;
        worksheet.getColumn('F').width = 20;
        worksheet.getColumn('H').width = 20;
        worksheet.eachRow({ includeEmpty: true }, function (row) {
            row.eachCell({ includeEmpty: true }, function (cell) {
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
            sharedFormula: 'C2-E2',
        };
        worksheet.getCell(`H9`).font = {
            bold: true,
            size: 18,
        };
        worksheet.fillFormula(`F2:F${lastRow.number}`, 'C2-E2');
        const caminhoArquivo = path.resolve('temp', `planilha${month}-${year}.xlsx`);
        await workbook.xlsx.writeFile(caminhoArquivo);
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.generatespreadsheet = generatespreadsheet;
//# sourceMappingURL=planilhaService..js.map