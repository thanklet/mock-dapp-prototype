import { Card, CardContent } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Divider } from "@/components/ui/divider";
import { Typography } from "@/components/ui/typography";
import { Avatar } from "@mui/material";
import { Button } from "@/components/ui/button";
import staff1Url from "@/assets/dummy/1.png";
import { useParams } from "react-router-dom";
import { IconHeart, IconCurrencyDollar } from "@tabler/icons-react";

// Vars
const userData = {
  name: "Nancy",
  userName: "Brooke Tegler",
  billingEmail: "shallamb@gmail.com",
  status: "active",
  contact: "+1 (234) 464-0600",
  country: "France",
};

export const UserDetails = () => {
  const { userId } = useParams();
  return (
    <>
      <Card>
        <CardContent className="flex flex-col pt-12 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center flex-col gap-1">
              <div className="flex flex-col items-center gap-1">
                <Avatar
                  alt="staff1"
                  src={staff1Url}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "2px solid",
                    borderColor: "secondary.main",
                  }}
                />
                <Typography variant="h5">{userData.name}</Typography>
                <Typography variant="body1">Customer ID #{userId}</Typography>
              </div>
            </div>
            <div className="flex items-center justify-around flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor:
                      "rgb(var(--mui-palette-primary-mainChannel) / 0.08)",
                  }}
                >
                  <IconHeart color="#7367F0" />
                </Avatar>
                <div>
                  <Typography variant="h5" fontSize={20}>
                    70
                  </Typography>
                  <Typography fontSize={16} color="text.secondary">
                    Thanks
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor:
                      "rgb(var(--mui-palette-primary-mainChannel) / 0.08)",
                  }}
                >
                  <IconCurrencyDollar color="#7367F0" />
                </Avatar>
                <div>
                  <Typography variant="h5" fontSize={20}>
                    568
                  </Typography>
                  <Typography fontSize={16} color="text.secondary">
                    THX
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Typography variant="h5" fontSize={20} color="text.primary">
              Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Username:
                </Typography>
                <Typography color="text.secondary">
                  {userData.userName}
                </Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Billing Email:
                </Typography>
                <Typography color="text.secondary">
                  {userData.billingEmail}
                </Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Status
                </Typography>
                <Chip
                  label={userData.status}
                  sx={{
                    backgroundColor: "#b9f6ca",
                    color: "#4caf50",
                  }}
                />
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Contact:
                </Typography>
                <Typography color="text.secondary">
                  {userData.contact}
                </Typography>
              </div>
              <div className="flex items-center flex-wrap gap-x-1.5">
                <Typography className="font-medium" color="text.primary">
                  Country:
                </Typography>
                <Typography color="text.secondary">
                  {userData.country}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button fullWidth variant="contained">
              Edit Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
