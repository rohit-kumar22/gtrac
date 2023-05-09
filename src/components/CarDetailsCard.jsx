import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Tab, Tabs } from "@mui/material";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SpeedIcon from "@mui/icons-material/Speed";
import PowerIcon from "@mui/icons-material/Power";
import KeyIcon from "@mui/icons-material/Key";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const styles = {
  font: {
    fontSize: "14px",
    color: "#333333",
    wordBreak: "break-word",
    fontWeight: "100",
  },
  icons: {
    fontSize: "14px",
  },
};

export default function CarDetailsCard({ data }) {
  const [filteredData, setFilteredData] = useState(data);

  const runningCars = data?.list.map((item) => {
    if (Number(item.gpsDtl.speed) !== 0) {
      console.log("speed", item.gpsDtl.speed);
      return item;
    }
  });

  console.log("data", data);
  console.log("running", runningCars);
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={10}>
            {/* <Box>
              <Tabs
                value={tab}
                onChange={handleTabs}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#5cb85c",
                    color: "black",
                    "& .MuiTab-root.Mui-selected": {
                      color: "red",
                    },
                  },
                }}>
                {tabHeadings.map((tab) => (
                  <Tab
                    value={tab.value}
                    label={tab.label}
                    sx={{
                      border: "none",
                      textTransform: "none",
                      color: "#5cb85c",
                    }}
                  />
                ))}
              </Tabs>
            </Box> */}
          </Grid>
        </Grid>

        <Box
          sx={{
            overflowY: "scroll",
            height: "90vh",
            scrollbarWidth: "thin",
          }}>
          {data?.list.map((item) => (
            <Box
              m={1}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
              }}>
              <Box sx={{ padding: "10px", borderBottom: "1px solid #9a9a9a" }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#333333",
                      }}>
                      {item.vehReg}
                    </Typography>
                  </Grid>

                  {/* ............................................................................ Running Icon ........................................................................ */}

                  <Grid item xs={2.5}>
                    <Box
                      sx={{
                        backgroundColor: "#aeffcd",
                        textAlign: "center",
                        padding: "5px",
                      }}>
                      <Typography sx={{ color: "#5cb85c", fontSize: "14px" }}>
                        Running
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={0.5}></Grid>

                  {/* ............................................................................ Shortcut Icon ........................................................................ */}

                  <Grid item xs={1}>
                    <Box
                      sx={{
                        backgroundColor: "#aeffcd",
                        textAlign: "center",
                        padding: "2.5px 5px 2.5px 5px",
                      }}>
                      <ShortcutIcon sx={{ color: "#5cb85c" }} />
                    </Box>
                  </Grid>
                  {/* .................................................................................Address......................................................................... */}
                  <Grid item xs={12} mt={2}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Box>
                        <LocationOnIcon
                          sx={{ color: "#ef5350", fontSize: "20px" }}
                        />
                      </Box>
                      <Typography sx={styles.font}>
                        <Box component="span">{item.gpsDtl.latLngDtl.addr}</Box>
                      </Typography>
                    </Box>
                  </Grid>
                  {/* ................................................................................. Time ......................................................................... */}
                  <Grid item xs={12} mt={1}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Box>
                        <AccessTimeFilledIcon
                          sx={{ paddingBottom: "-15px", fontSize: "20px" }}
                        />
                      </Box>
                      <Typography sx={styles.font}>
                        {item.gpsDtl.latLngDtl.gpstime}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* ................................................................................. Speed ......................................................................... */}
                  <Grid item xs={12} mt={1}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <Box>
                        <SpeedIcon
                          sx={{
                            paddingBottom: "-15px",
                            color: "#4a9aba",
                            fontSize: "20px",
                          }}
                        />
                      </Box>
                      <Typography sx={styles.font}>
                        {item.speed ? item.speed : "0"} kmph
                      </Typography>
                    </Box>
                  </Grid>

                  {/* ...................................................................................... Consignment ........................................................................................ */}
                  <Grid item xs={12} mt={1}>
                    <Grid container>
                      <Grid item xs={0.8}>
                        <LocalShippingIcon
                          sx={{ color: "#9a9a9a", fontSize: "20px" }}
                        />
                      </Grid>
                      <Grid item xs={7.2}>
                        <Typography sx={styles.font}>Consignment</Typography>
                      </Grid>
                      <Grid item xs={0.8}>
                        <PowerIcon
                          sx={{ color: "#da7532", fontSize: "20px" }}
                        />
                      </Grid>
                      <Grid item xs={1.2}>
                        <Typography>On</Typography>
                      </Grid>
                      <Grid item xs={0.8}>
                        <KeyIcon sx={{ color: "#da7532", fontSize: "20px" }} />
                      </Grid>
                      <Grid item xs={1.2}>
                        On
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={7}>
                  <Typography>
                    {item.drivers.driverName.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
