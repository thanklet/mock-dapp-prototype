import styles from "@/styles/table.module.css";
import staff1Url from "@/assets/dummy/1.png";
import staff2Url from "@/assets/dummy/2.png";
import staff3Url from "@/assets/dummy/3.png";
import emojiHappyUrl from "@/assets/emoji/happy.svg";
import emojiHelpfulUrl from "@/assets/emoji/helpful.svg";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Select } from "@/components/ui/form/select";
import { TextField } from "@/components/ui/form/text-field";
import { Typography } from "@/components/ui/typography";
import { Box } from "@mui/material";
import { IconDotsVertical, IconUpload } from "@tabler/icons-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TransactionType = {
  id: number;
  thanker: {
    name: string;
    email: string;
    image: string;
  };
  stamp: string;
  date: string;
  place: string;
};

const columnHelper = createColumnHelper<TransactionType>();

const tableData = [
  {
    id: 1,
    thanker: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: staff1Url,
    },
    stamp: emojiHappyUrl,
    date: "Thu May 10, 2024",
    place: "Chitose nursery school",
  },
  {
    id: 2,
    thanker: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      image: staff2Url,
    },
    stamp: emojiHelpfulUrl,
    date: "Thu May 10, 2024",
    place: "Chitose nursery school",
  },
  {
    id: 3,
    thanker: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: staff3Url,
    },
    stamp: emojiHelpfulUrl,
    date: "Thu May 10, 2024",
    place: "Chitose nursery school",
  },
];

export const TransactionTable = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const columns = useMemo<ColumnDef<TransactionType, any>[]>(
    () => [
      {
        id: "select",
        header: () => <Checkbox />,
        cell: () => <Checkbox />,
      },
      columnHelper.accessor("thanker", {
        header: "Thanker",
        cell: ({ row }) => (
          <Box display="flex" gap="16px">
            <Avatar src={row.original.thanker.image} alt="staff" />
            <Box>
              <Typography color="primary" fontSize="15px" fontWeight="bold">
                {row.original.thanker.name}
              </Typography>
              <Typography color="text.secondary" fontSize="13px">
                {row.original.thanker.email}
              </Typography>
            </Box>
          </Box>
        ),
      }),
      columnHelper.accessor("stamp", {
        header: "Stamp",
        cell: ({ row }) => (
          <Box width="100px">
            <img src={row.original.stamp} alt="stamp" />
          </Box>
        ),
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: ({ row }) => <Typography>{row.original.date}</Typography>,
      }),
      columnHelper.accessor("place", {
        header: "Place",
        cell: ({ row }) => <Typography>{row.original.place}</Typography>,
      }),
      {
        id: "dots",
        header: () => "STATUS",
        cell: () => <IconDotsVertical size={16} />,
      },
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
            alignItems: "center",
            p: "24px",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box>
            <TextField hiddenLabel placeholder="Search Review" />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Box width="80px">
              <Select
                id="select01"
                value="10"
                items={[
                  {
                    value: "10",
                    children: "10",
                  },
                  {
                    value: "20",
                    children: "20",
                  },
                  {
                    value: "30",
                    children: "30",
                  },
                ]}
              />
            </Box>
            <Box width="100px">
              <Select
                id="select02"
                value="all"
                items={[
                  {
                    value: "all",
                    children: "All",
                  },
                ]}
              />
            </Box>
            <Button
              variant="contained"
              disabled
              startIcon={<IconUpload size={16} />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Export
            </Button>
          </Box>
        </Box>

        <table className={styles.table}>
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
      </Card>
    </>
  );
};
