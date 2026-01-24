"use client"

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table"
import type { CSSProperties, Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "utils/styleUtils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  // navigation
  navigateTable?: boolean
  queryParams?: Record<string, string>
  customNavigationUrl?: (rowData: TData) => string

  // ✅ pagination
  pageNumber?: number
  pageSize?: number
  totalPages?: number
  setPageNumber?: Dispatch<SetStateAction<number>>
  setPageSize?: Dispatch<SetStateAction<number>>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  navigateTable,
  queryParams,
  customNavigationUrl,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const navigate = useNavigate()

  const buildNavigationUrl = (row: any) => {
    if (customNavigationUrl) {
      return customNavigationUrl(row.original)
    }

    const baseUrl = row.getValue("id")
    if (queryParams && Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams(queryParams)
      return `${baseUrl}?${searchParams.toString()}`
    }

    return baseUrl
  }

  return (
    <div className="rounded-md border dark:text-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const styles: CSSProperties = header.getSize() !== 150 ? { width: `${header.getSize()}px` } : {}
                return (
                  <TableHead key={header.id} style={styles}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn({ "cursor-pointer": navigateTable })}
                onClick={() => navigateTable && navigate(buildNavigationUrl(row))}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}


// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from 'components/ui/table';
// import { CSSProperties } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { cn } from 'utils/styleUtils';

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   navigateTable?: boolean;
// }

// const DEFAULT_TABLE_COLUMN_WIDTH = 150;

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   navigateTable,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//   const navigate = useNavigate();

//   return (
//     <div className="rounded-md border dark:text-white">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map(headerGroup => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map(header => {
//                 const styles: CSSProperties =
//                   header.getSize() !== DEFAULT_TABLE_COLUMN_WIDTH
//                     ? { width: `${header.getSize()}px` }
//                     : {};
//                 return (
//                   <TableHead key={header.id} style={styles}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map(row => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && 'selected'}
//                 className={cn({ 'cursor-pointer': navigateTable })}
//                 onClick={() => navigateTable && navigate(row.getValue('id'))}
//               >
//                 {row.getVisibleCells().map(cell => (
//                   <TableCell key={cell.id} className="py-3">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }