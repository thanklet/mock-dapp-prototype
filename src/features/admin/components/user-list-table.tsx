import { useMemo } from "react";
import "@/styles/table.css";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

import classnames from "classnames";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

type UsersType = {
  id: number;
  userName: string;
};

// Column Definitions
const columnHelper = createColumnHelper<UsersType>();

export const UserListTable = () => {
  const tableData = [
    {
      id: 1,
      userName: "John Doe",
    },
  ];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const columns = useMemo<ColumnDef<UsersType, any>[]>(
    () => [
      {
        id: "select",
        header: () => <Checkbox />,
        cell: () => <Checkbox />,
      },
      columnHelper.accessor("userName", {
        header: "User",
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.userName}
          </Typography>
        ),
      }),
    ],

    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            p: 6,
            borderBottom: "1px solid",
            borderColor: "divider",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 4,
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              startIcon={<i className="tabler-upload" />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Add New User
            </Button>
          </Box>
        </Box>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};
