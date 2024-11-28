import { useUser } from "@/app/providers/user-provider.tsx";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { path } from "@/utils/path";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../api";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY as string;

const DEFAULT = {
  CENTER: {
    lat: 35.63093,
    lng: 139.7032,
  },
  ZOOM: 16,
} as const;

const VIEW_STYLE = {
  width: "100%",
  height: "calc(100svh - 44px)",
};

const createRandomPosition = () => {
  // 中央からランダムに位置を設定
  const RANDOM_RANGE = 0.005;
  const isPlus = Math.random() > 0.5;
  const randomOffset = () => (isPlus ? 1 : -1) * Math.random() * RANDOM_RANGE;

  return {
    lat: DEFAULT.CENTER.lat + randomOffset(),
    lng: DEFAULT.CENTER.lng + randomOffset(),
  };
};

export const Location = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user.uid;
  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setMapElement(node);
    }
  }, []);

  const { data: allUsers } = useGetUsers();
  const users = allUsers.docs
    .map((doc) => ({
      ...doc.data(),
      id: doc.id,
      image_path: doc.data().image_path,
    }))
    .filter((user) => user.id !== userId);

  useEffect(() => {
    const initMap = () => {
      if (mapElement && !map && users.length > 0) {
        const option = {
          center: DEFAULT.CENTER,
          zoom: DEFAULT.ZOOM,
          mapId: "location",
        };
        const googleMap = new window.google.maps.Map(mapElement, option);
        setMap(googleMap);

        const markers = users.map((user) => ({
          position: createRandomPosition(),
          src: user.image_path,
          userId: user.id,
        }));

        for (const marker of markers) {
          const markerElement = document.createElement("img");
          markerElement.src = marker.src;
          markerElement.style.width = "50px";
          markerElement.style.height = "50px";
          markerElement.style.borderRadius = "50%";
          markerElement.onclick = () => {
            navigate(path.get().app.thanks.send(marker.userId));
          };
          new window.google.maps.marker.AdvancedMarkerElement({
            position: marker.position,
            map: googleMap,
            content: markerElement,
          });
        }
      }
    };
    initMap();
  }, [mapElement, map, users, navigate]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <Wrapper
          apiKey={GOOGLE_MAP_API_KEY}
          version="beta"
          libraries={["marker"]}
        >
          <div style={VIEW_STYLE} ref={refCallback} />
        </Wrapper>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          maxHeight: "200px",
          overflow: "auto",
          padding: "30px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={"24px"}
          justifyContent={"space-evenly"}
        >
          {users.map((x) => (
            <Link
              to={path.get().app.thanks.send(x.id)}
              key={x.id}
              className="text-decoration-none w-20"
            >
              <Avatar src={x.image_path} sx={{ width: 80, height: 80 }} />
              <Typography
                width={"100%"}
                textAlign="center"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {x.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
