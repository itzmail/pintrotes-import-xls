"use client"
import ExcelImporter from "@/components/ExcelImporter";
import StudentTable from "@/components/StudentTable";
import { useState } from "react";

export default function Home() {
  const [studentData, setStudentData] = useState<Student[]>([]);

  const handleDataImported = (data: any[]) => {
    console.log('Data received in Home:', data); // Debug log
    setStudentData(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Student Data Import</h1>
      <ExcelImporter onDataImported={handleDataImported} />
      {studentData.length > 0 && <StudentTable data={studentData} />}
    </div>
  );
}
