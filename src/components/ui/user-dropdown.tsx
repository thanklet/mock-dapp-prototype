import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { MenuList } from "@/components/ui/menu-list";
import { Paper } from "@/components/ui/paper";
import { Popper } from "@/components/ui/popper";
import { Typography } from "@/components/ui/typography";

const BadgeContentSpan = styled("span")({
  width: 8,
  height: 8,
  borderRadius: "50%",
  cursor: "pointer",
  backgroundColor: "var(--mui-palette-success-main)",
  boxShadow: "0 0 0 2px var(--mui-palette-background-paper)",
});

type UserDropdownProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleDropdownClose = (
    event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent),
  ) => {
    if (anchorRef.current?.contains(event?.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap="circular"
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="mis-2"
      >
        <Avatar
          ref={anchorRef}
          alt={user.name}
          src={user.image}
          onClick={handleDropdownOpen}
          className="cursor-pointer bs-[38px] is-[38px]"
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        className="min-is-[240px] !mbs-3 z-[1]"
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "left top",
            }}
          >
            <Paper className="bordered shadow-lg">
              <ClickAwayListener
                onClickAway={(e) =>
                  handleDropdownClose(e as MouseEvent | TouchEvent)
                }
              >
                <MenuList>
                  <div
                    className="flex items-center py-2 px-6 gap-2"
                    tabIndex={-1}
                  >
                    <Avatar alt={user.name} src={user.image} />
                    <div className="flex items-start flex-col">
                      <Typography className="font-medium" color="text.primary">
                        {user.name}
                      </Typography>
                      <Typography variant="caption">{user.email}</Typography>
                    </div>
                  </div>
                  <Divider className="mlb-1" />
                  <div className="flex items-center py-2 px-6">
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="small"
                      endIcon={<i className="tabler-logout" />}
                      sx={{
                        "& .MuiButton-endIcon": { marginInlineStart: 1.5 },
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
