import staff1Url from "@/assets/dummy/1.png";
import staff2Url from "@/assets/dummy/2.png";
import { Avatar } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// TODO: Google Map API Keyは作成してもらう
const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY as string;

const DEFAULT = {
  CENTER: {
    lat: 35.63093,
    lng: 139.7032,
  } as google.maps.LatLngLiteral,
  ZOOM: 16,
} as const;

const VIEW_STYLE = {
  width: "100%",
  height: "calc(100svh - 44px)",
};
const USERS = [
  {
    id: 1,
    name: "John",
    image: staff1Url,
  },
  {
    id: 2,
    name: "Nancy",
    image: staff2Url,
  },
];

export const Location = () => {
  const { userId } = useParams();

  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setMapElement(node);
    }
  }, []);

  useEffect(() => {
    const initMap = () => {
      if (mapElement && !map) {
        const option = {
          center: DEFAULT.CENTER,
          zoom: DEFAULT.ZOOM,
        };
        const googleMap = new window.google.maps.Map(mapElement, option);
        setMap(googleMap);

        const markers = [
          {
            position: {
              lat: 35.63146,
              lng: 139.70384,
            },
            icon: {
              url: staff1Url,
              scaledSize: new window.google.maps.Size(50, 50),
            },
          },
          {
            position: {
              lat: 35.63275,
              lng: 139.70042,
            },
            icon: {
              url: staff2Url,
              scaledSize: new window.google.maps.Size(50, 50),
            },
          },
        ];

        for (const marker of markers) {
          new window.google.maps.Marker({
            position: marker.position,
            map: googleMap,
            icon: marker.icon,
          });
        }
      }
    };
    initMap();
  }, [mapElement, map]);

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
          {USERS.map((user) => (
            <Link to={`app/${userId}/thanks/send/${user.id}`} key={user.id}>
              <Avatar src={user.image} sx={{ width: 70, height: 70 }} />
              <Typography width={"100%"} textAlign="center">
                {user.name}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
