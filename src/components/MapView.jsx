import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import greenTruck from "../assets/greenTruck.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";

const imgUrl = "https://maps.gstatic.com/mapfiles/transparent.png";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const center = {
  lat: 23.600944,
  lng: 78.341832,
};

const styles = {
  key: {
    fontSize: "12px",
    fontWeight: 800,
    color: "#FD6A02",
    paddingBottom: "7px",
  },

  values: {
    fontWeight: 500,
    color: "#303030",
  },
};

export default function MapView({ data, zoomControl }) {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [zoomOut, setZoomOut] = useState(5);

  useEffect(() => {
    console.log("zoomOut");
    setZoomOut(5);
  }, [data]);

  console.log("Map Called", data);

  return (
    <>
      <Box>
        <Box sx={{ position: "relative", margin: "0 0 0 0" }}>
          <Box
            sx={{
              position: "absolute",
              width: "20px",
              height: "100%",
              top: 70,
              left: 0,
              zIndex: 5,
            }}>
            <Typography></Typography>
          </Box>
          <LoadScript googleMapsApiKey="">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoomOut}>
              <MarkerClusterer>
                {(clusterer) => (
                  <Box>
                    {data?.map((item, index) => (
                      <Marker
                        key={index}
                        position={{
                          lat: item.gpsDtl.latLngDtl.lat,
                          lng: item.gpsDtl.latLngDtl.lng,
                        }}
                        title={item.vehReg}
                        label={item.veh}
                        // icon={imgUrl}
                        onClick={() => setSelectedMarker(item)}
                        clusterer={clusterer}
                      />
                    ))}
                    {selectedMarker && (
                      <InfoWindow
                        position={{
                          lat: selectedMarker.gpsDtl.latLngDtl.lat,
                          lng: selectedMarker.gpsDtl.latLngDtl.lng,
                        }}
                        onCloseClick={() => setSelectedMarker(null)}>
                        <Box sx={{ width: "400px" }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: 700,
                                }}>
                                {selectedMarker.vehReg}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography sx={styles.key}>
                                Location :{" "}
                                <Box
                                  component="span"
                                  sx={styles.values}
                                  style={{ wordBreak: "break-word" }}>
                                  {selectedMarker.gpsDtl.latLngDtl.addr}
                                </Box>
                              </Typography>
                              <Typography sx={styles.key}>
                                Speed :{" "}
                                <Box component="span" sx={styles.values}>
                                  {selectedMarker.gpsDtl.speed
                                    ? "0"
                                    : selectedMarker.gpsDtl.speed}{" "}
                                  km/hr
                                </Box>
                              </Typography>
                              <Typography sx={styles.key}>
                                Date Time :{" "}
                                <Box component="span" sx={styles.values}>
                                  {selectedMarker.gpsDtl.latLngDtl.gpstime}
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{ textAlign: "end", paddingTop: "10px" }}>
                              <Button sx={{ color: "#404040" }}>
                                More Info
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </InfoWindow>
                    )}
                  </Box>
                )}
              </MarkerClusterer>
            </GoogleMap>
          </LoadScript>
        </Box>
      </Box>
    </>
  );
}
