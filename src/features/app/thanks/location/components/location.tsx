import { Wrapper } from "@googlemaps/react-wrapper";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const Location = () => {
  const GOOGLE_MAP_API_KEY = "AIzaSyDC7TO_ezKF-CJY7hswgS8XxJm-1x-bTBo";
  const DEFAULT = {
    CENTER: {
      lat: 35.63304,
      lng: 139.70058,
    } as google.maps.LatLngLiteral,
    ZOOM: 16,
  } as const;

  const VIEW_STYLE = {
    width: "100%",
    height: "calc(100vh - 24px)",
  };

  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker | undefined>(
    undefined,
  );

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setMapElement(node);
    }
  }, []);

  useEffect(() => {
    const initMap = async () => {
      if (mapElement && !map) {
        const option = {
          center: DEFAULT.CENTER,
          zoom: DEFAULT.ZOOM,
        };
        const googleMap = new window.google.maps.Map(mapElement, option);
        setMap(googleMap);

        // カスタムピンのアイコンを設定
        const customIcon = {
          url: "https://placehold.jp/150x150.png", // カスタムアイコンのURL
          scaledSize: new window.google.maps.Size(50, 50), // サイズ
        };

        const customMarker = new window.google.maps.Marker({
          position: DEFAULT.CENTER,
          map: googleMap,
          icon: customIcon,
        });
        setMarker(customMarker);
      }
    };
    initMap();
  }, [mapElement, map, DEFAULT.CENTER, DEFAULT.ZOOM]);

  return (
    <Box>
      <Wrapper
        apiKey={GOOGLE_MAP_API_KEY}
        version="beta"
        libraries={["marker"]}
      >
        <div style={VIEW_STYLE} ref={refCallback} />
      </Wrapper>
    </Box>
  );
};
