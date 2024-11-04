import staff1Url from "@/assets/dummy/1.png";
import staff2Url from "@/assets/dummy/2.png";
import { Avatar } from "@/components/ui/avatar";
import { TextField } from "@/components/ui/form/text-field";
import { Typography } from "@/components/ui/typography";
import { path } from "@/utils/path";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetUsers } from "../api";

export const Search = () => {
  const { userId } = useParams();

  const { data: allUsers } = useGetUsers();
  const users = allUsers.docs
    .map((doc, index) => ({
      ...doc.data(),
      id: doc.id,
      // TODO: プロトタイプではimage_pathは仮なので、交互にダミー画像を表示させている
      image_path: index % 2 === 0 ? staff1Url : staff2Url,
    }))
    .filter((user) => user.id !== userId);

  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filtered = users.filter(
      ({ name, email }) =>
        name.includes(searchValue) || email.includes(searchValue),
    );
    setFilteredUsers(filtered);
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "background.default",
      }}
    >
      <Stack
        direction="column"
        gap={2}
        sx={{ backgroundColor: "white", borderRadius: "16px", padding: "24px" }}
      >
        <TextField placeholder="Search" onChange={handleSearch} />
        <Stack direction="column">
          <Typography
            variant="body1"
            sx={{
              py: 2,
              textTransform: "uppercase",
            }}
          >
            Customers
          </Typography>
          {filteredUsers.map((user) => (
            <Link
              to={path.get().app.userId.thanks.send(userId, user.id)}
              key={user.id}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={3}
                py={2}
                borderTop={1}
                borderColor="divider"
              >
                <Avatar src={user.image_path} sx={{ width: 50, height: 50 }} />
                <Typography>{user.name}</Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
