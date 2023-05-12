import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import truckGreen from "../assets/truckGreen.png";
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
    fontWeight: 600,
    color: "#303030",
    paddingBottom: "7px",
  },

  values: {
    fontSize: "12px",
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
                        // icon={truckGreen}
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
                        <Box sx={{ width: "350px" }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  color: "#81b790",
                                }}>
                                Vehicle Information
                              </Typography>
                            </Grid>
                            <Grid item xs={12} pt={1}>
                              {/* ..................................................................................... Vehicle No .................................................................. */}

                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography sx={styles.key}>
                                    Vehicle No.
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography sx={styles.values}>
                                    {selectedMarker.vehReg}
                                  </Typography>
                                </Grid>
                              </Grid>
                              {/* ..................................................................................... Speed .................................................................. */}
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography sx={styles.key}>Speed</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography sx={styles.values}>
                                    {selectedMarker.gpsDtl.speed
                                      ? "0"
                                      : selectedMarker.gpsDtl.speed}{" "}
                                    km/hr
                                  </Typography>
                                </Grid>
                              </Grid>
                              {/* ..................................................................................... Last Update .................................................................. */}
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography sx={styles.key}>
                                    Last Updated
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography sx={styles.values}>
                                    {selectedMarker.gpsDtl.speed
                                      ? "0"
                                      : selectedMarker.gpsDtl.speed}{" "}
                                    km/hr
                                  </Typography>
                                </Grid>
                              </Grid>
                              {/* ..................................................................................... Location .................................................................. */}
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography sx={styles.key}>
                                    Location
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography
                                    sx={styles.values}
                                    style={{ wordBreak: "break-word" }}>
                                    {selectedMarker?.gpsDtl.latLngDtl.addr}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* ..................................................................................... More Info .................................................................. */}
                            <Grid
                              item
                              xs={12}
                              sx={{ textAlign: "left", paddingTop: "10px" }}>
                              <Button
                                sx={{ color: "#0d6efd", textTransform: "none" }}
                                variant="outlined">
                                <AddIcon sx={{ fontSize: "16px" }} />
                                Add Address
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
