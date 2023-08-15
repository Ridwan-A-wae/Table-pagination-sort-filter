import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import fakeData from "../MOCK_DATA.json";
import movieData from "../MOVIE_DATA.json"
import { DateTime } from "luxon";
import "./table.css";

function Table() {
  // {
  //     "id": 1,
  //     "first_name": "Isador",
  //     "last_name": "Kruger",
  //     "email": "ikruger0@huffingtonpost.com",
  //     "gender": "Male",
  //     "dob": "2023-04-28T11:19:35Z"
  //   },

  const data = useMemo(() => fakeData, []);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "First ",
      accessorKey: "first_name",
      footer: "First name",
    },
    {
      header: "Last ",
      accessorKey: "last_name",
      footer: "Last name",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "Email",
    },
    {
      header: "Gender",
      accessorKey: "gender",
      footer: "Gender",
    },
    {
      header: "Date of birth",
      accessorKey: "dob",
      footer: "Date of birth",
      cell: (Info) =>
        DateTime.fromISO(Info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
  ];


  // State

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('')

  // Table ********************************************************************************************************

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });

  return (
    <div className="w3-container">
      <input className="filterInput" placeholder="Search" type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
      <br />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroupt) => (
            <tr key={headerGroupt.id}>
              {headerGroupt.headers.map((header) => (
                <th
                  style={{ cursor: "pointer", width: "500px" }}
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {
                    { asc: "🔼", desc: "🔽" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
        {table.getFooterGroups().map((FooterGroup) => (
            <tr key={FooterGroup.id}>
              {FooterGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <br />
      <button className="btn" onClick={() => table.setPageIndex(0)}>
        First page
      </button>
      <button
        className={!table.getCanPreviousPage() ? "disBtn" : "btn"}
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        Previous page
      </button>
      <button
        className={!table.getCanNextPage() ? "disBtn" : "btn"}
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        Next page
      </button>
      <button
        className="btn"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        Last Page
      </button>
    </div>
  );
}

export default Table;
