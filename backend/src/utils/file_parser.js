import csv from 'csv-parser';
import { Readable } from 'stream';
import * as xlsx from 'xlsx';

export const parseCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const stream = Readable.from(buffer);
        stream
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

export const parseExcel = (buffer) => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
};
