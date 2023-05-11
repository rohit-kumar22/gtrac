import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Tab, Tabs } from "@mui/material";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SpeedIcon from "@mui/icons-material/Speed";
import PowerIcon from "@mui/icons-material/Power";
import KeyIcon from "@mui/icons-material/Key";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BlockIcon from "@mui/icons-material/Block";

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
  switch: {
    fontSize: "14px",
    color: "#da7532",
  },
};

export default function CarDetailsCard({ data, setMapData, mapData }) {
  const handleCardClick = (data) => {
    if (mapData?.data && mapData?.data.list[0].vehReg === data.vehReg) {
      setMapData({
        state: !mapData.state,
        data: { list: [data] },
      });
    } else {
      setMapData({
        state: true,
        data: { list: [data] },
      });
    }
  };

  console.log("cards", data?.list.length);
  return (
    <>
      <Box>
        <Grid container></Grid>

        <Box
          sx={{
            overflowY: "scroll",
            height: "85vh",
            scrollbarWidth: "thin",
          }}>
          {data?.list.map((item, index) => (
            <Box
              key={index}
              m={1}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(item)}>
              <Box sx={{ padding: "10px", borderBottom: "1px solid #9a9a9a" }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#333333",
                        paddingTop: "5px",
                      }}>
                      {item.vehReg}
                    </Typography>
                  </Grid>

                  {/* ............................................................................ Running Icon ........................................................................ */}

                  <Grid item xs={2.6}>
                    {item.gpsDtl.speed === 0 ? (
                      <Grid
                        container
                        sx={{
                          backgroundColor: "#ffbdae",
                          textAlign: "center",
                          padding: "5px",
                          cursor: "pointer",
                          height: "30px",
                        }}>
                        <Grid item xs={4}>
                          <BlockIcon
                            sx={{
                              paddingBottom: "-15px",
                              color: "#cc6c46",
                              fontSize: "20px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{
                              color: "#cc6c46",
                              fontSize: "12px",
                              paddingTop: "2.5px",
                            }}>
                            STOPPED
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        sx={{
                          backgroundColor: "#aeffcd",
                          textAlign: "center",
                          padding: "5px",
                          cursor: "pointer",
                          height: "30px",
                        }}>
                        <Grid item xs={4}>
                          <SpeedIcon
                            sx={{
                              paddingBottom: "-15px",
                              color: "#0ab222",
                              fontSize: "20px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{
                              color: "#0ab222",
                              fontSize: "12px",
                              paddingTop: "2.5px",
                            }}>
                            RUNNING
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={0.4}></Grid>

                  {/* ............................................................................ Shortcut Icon ........................................................................ */}

                  <Grid item xs={1}>
                    <Box
                      sx={{
                        backgroundColor: "#aeffcd",
                        textAlign: "center",
                        padding: "0px 5px 0px 5px",
                        cursor: "pointer",
                        height: "30px",
                      }}>
                      <ShortcutIcon sx={{ color: "#0ab222" }} />
                    </Box>
                  </Grid>
                  {/* .................................................................................Address......................................................................... */}
                  <Grid item xs={12} mt={2}>
                    <Box sx={{ display: "flex" }}>
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
                        {item.gpsDtl.speed ? item.gpsDtl.speed : "0"} kmph
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
                      <Grid item xs={0.6}>
                        <PowerIcon
                          sx={{ color: "#da7532", fontSize: "20px" }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Typography sx={styles.switch}>Off</Typography>
                      </Grid>
                      <Grid item xs={0.6}>
                        <KeyIcon sx={{ color: "#da7532", fontSize: "20px" }} />
                      </Grid>
                      <Grid item xs={1.2}>
                        <Typography sx={styles.switch}>Off</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* ..........................................................................................Driver Details................................................................... */}

              <Grid container>
                <Grid item xs={0.5}></Grid>
                <Grid item xs={1} py={0.5}>
                  <Box
                    sx={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#d9d9d9",
                      borderRadius: "50%",
                    }}></Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography pt={1} sx={styles.font}>
                    {item.drivers.driverName
                      ? item.drivers.driverName.toUpperCase()
                      : "NA"}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography pt={1} sx={styles.font}>
                    <Box component="span" style={{ fontWeight: 600 }}>
                      +91&nbsp;
                    </Box>
                    {item.drivers.phoneNumber ? item.drivers.phoneNumber : ""}
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
