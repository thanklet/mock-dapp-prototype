import staff1Url from "@/assets/dummy/1.png";
import staff2Url from "@/assets/dummy/2.png";
import staff3Url from "@/assets/dummy/3.png";
import hospitalityUrl from "@/assets/hospitality.png";
import wishlistUrl from "@/assets/wishlist.png";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Select } from "@/components/ui/form/select";
import { TextField } from "@/components/ui/form/text-field";
import { Typography } from "@/components/ui/typography";
import styles from "@/styles/table.module.css";
import { path } from "@/utils/path";
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
import { Link } from "react-router-dom";

type UsersType = {
  id: number;
  staff: {
    name: string;
    email: string;
    image: string;
  };
  thanks: number;
  wishlist: number;
  hospitality: string;
};

const columnHelper = createColumnHelper<UsersType>();

const tableData = [
  {
    id: 1,
    staff: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: staff1Url,
    },
    thanks: 100,
    wishlist: 15,
    hospitality: hospitalityUrl,
  },
  {
    id: 2,
    staff: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      image: staff2Url,
    },
    thanks: 200,
    wishlist: 20,
    hospitality: hospitalityUrl,
  },
  {
    id: 3,
    staff: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: staff3Url,
    },
    thanks: 300,
    wishlist: 20,
    hospitality: hospitalityUrl,
  },
];

export const UserListTable = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const columns = useMemo<ColumnDef<UsersType, any>[]>(
    () => [
      {
        id: "select",
        header: () => <Checkbox />,
        cell: () => <Checkbox />,
      },
      columnHelper.accessor("staff", {
        header: "Staff",
        cell: ({ row }) => (
          <Link to={path.get().admin.users.userId((row.index + 1).toString())}>
            <Box display="flex" gap="16px">
              <Avatar src={row.original.staff.image} alt="staff" />
              <Box>
                <Typography color="primary" fontSize="15px" fontWeight="bold">
                  {row.original.staff.name}
                </Typography>
                <Typography color="text.secondary" fontSize="13px">
                  {row.original.staff.email}
                </Typography>
              </Box>
            </Box>
          </Link>
        ),
      }),
      columnHelper.accessor("thanks", {
        header: "Thanks",
        cell: ({ row }) => <Typography>{row.original.thanks} THX</Typography>,
      }),
      columnHelper.accessor("wishlist", {
        header: "Wishlist",
        cell: ({ row }) => (
          <Box display="flex" gap="8px" alignItems="center">
            <img
              src={wishlistUrl}
              alt="wishlist"
              style={{ width: "30px", height: "auto" }}
            />
            <Typography>{row.original.wishlist}</Typography>
          </Box>
        ),
      }),
      columnHelper.accessor("hospitality", {
        header: "Hospitality",
        cell: ({ row }) => (
          <Box>
            <img
              src={row.original.hospitality}
              alt="hospitality"
              style={{ width: "120px", height: "auto" }}
            />
          </Box>
        ),
      }),
      {
        id: "dots",
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
