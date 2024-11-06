import { useUser } from "@/app/providers/user-provider.tsx";
import staff1Url from "@/assets/dummy/1.png";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { path } from "@/utils/path";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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

// モック用のダミー位置
const POSITIONS = [
  {
    lat: 35.63146,
    lng: 139.70384,
  },
  {
    lat: 35.63275,
    lng: 139.70042,
  },
];

export const Location = () => {
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
      // TODO: プロトタイプではアバター編集機能がないので固定表示
      image_path: staff1Url,
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

        const markers = users.map((user, index) => ({
          position: POSITIONS[index],
          src: user.image_path,
        }));

        for (const marker of markers) {
          const markerElement = document.createElement("img");
          markerElement.src = marker.src;
          markerElement.style.width = "50px";
          markerElement.style.height = "50px";
          markerElement.style.borderRadius = "50%";
          new window.google.maps.marker.AdvancedMarkerElement({
            position: marker.position,
            map: googleMap,
            content: markerElement,
          });
        }
      }
    };
    initMap();
  }, [mapElement, map, users]);

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
          padding: "30px 20px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack direction="row" flexWrap="wrap" gap={"20px"}>
          {users.map((x) => (
            <Link
              to={path.get().app.thanks.send(x.id)}
              key={x.id}
              style={{ textDecoration: "none" }}
            >
              <Avatar src={x.image_path} sx={{ width: 70, height: 70 }} />
              <Typography width={"100%"} textAlign="center">
                {x.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
