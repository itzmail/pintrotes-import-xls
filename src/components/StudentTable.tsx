import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
  } from '@tanstack/react-table';
  import { useState } from 'react';
  
  interface StudentTableProps {
    data: any[];
  }
  
  const StudentTable: React.FC<StudentTableProps> = ({ data }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    
    const columns = [
      {
        accessorKey: 'No',
        header: 'NO',
      },
      {
        accessorKey: 'NISN',
        header: 'NISN',
      },
      {
        accessorKey: 'Nama',
        header: 'NAMA',
      },
      {
        accessorKey: 'Kelamin',
        header: 'KELAMIN',
      },
      {
        accessorKey: 'Tingkat',
        header: 'TINGKAT',
      },
    ];
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true, // Enable debug mode
    });
  
    return (
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-1">
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No data available. Please import an Excel file.
          </div>
        )}
      </div>
    );
  };
  
  export default StudentTable;