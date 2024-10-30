// components/ExcelImporter.tsx
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelImporterProps {
  onDataImported: (data: any[]) => void;
}

const ExcelImporter: React.FC<ExcelImporterProps> = ({ onDataImported }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // cek jika tidak ada file yang diupload dan formatnya excel
    if (!file || !file.name.match(/\.(xlsx|xls)$/)) {
      alert('Please upload an Excel file.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Add header row handling
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: ['No', 'NISN', 'Nama', 'Kelamin', 'Tingkat'],
          range: range.s.r + 4 // Skip header
        });
        
        console.log('Parsed Excel Data:', jsonData);
        onDataImported(jsonData);
      } catch (error) {
        console.error('Error parsing Excel:', error);
        alert('Error reading Excel file. Please check the console for details.');
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      alert('Error reading file. Please try again.');
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Import Excel File
      </label>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-500">
          Imported: {fileName}
        </p>
      )}
    </div>
  );
};

export default ExcelImporter;