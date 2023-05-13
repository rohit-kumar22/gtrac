import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
// import { Box } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Sidebar from "./Sidebar";
import SingleCarDetailsCard from "./SingleCarDetailsCard";
import CarDetailsCard from "./CarDetailsCard";
import Navbar from "./Navbar";
import axios from "axios";
import MapView from "./MapView";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  notActive: {
    display: "inline-block",
    fontSize: "16px",
    minwidth: "65px",
    color: "#333333",
    textTransform: "none",
    fontWeight: 400,
    pb: 0,
    pt: 2,

    "&:hover:": { backgroundColor: "none" },
  },
  active: {
    display: "inline-block",
    fontSize: "16px",
    minwidth: "65px",
    color: "#5cb85c",
    textTransform: "none",
    fontWeight: 600,
    pb: 0,
    pt: 2,
    "&::after": {
      content: '" "',
      display: "block",
      margin: "0 auto",
      height: "2px",
      width: "auto !important",
      backgroundColor: "#5cb85c",
    },
  },
};
const defalutData = {
  running: [],
  all: [],
  poi: [],
  ide: [],
};
const defaultTab = {
  RUNNING: { label: "Running", value: "running" },
  IDE: { label: "Idle", value: "ide" },
  ALL: { label: "All", value: "all" },
  POI: { label: "POI", value: "poi" },
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [progressBar, setProgressBar] = useState(false);
  const [filteredData, setFilteredData] = useState(defalutData);
  const [tab, setTab] = useState(defaultTab.RUNNING.value);
  const [mode, setMode] = useState(defaultTab);
  const [mapData, setMapData] = useState({ state: false, data: null });
  var stopped = 0;
  var running = 0;

  const url =
    "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

  const getData = async () => {
    // debugger;
    setProgressBar(true);

    const response = await fetch(url);
    const res = await response.json();
    const running = res?.list.filter((item) => {
      return Number(item.gpsDtl.speed) > 0;
    });

    const stopped = res?.list.filter((item) => {
      return item.gpsDtl.speed === 0 || item.gpsDtl.speed === "";
    });

    setProgressBar(false);
    setFilteredData((prev) => ({
      running: running,
      ide: stopped,
      all: res.list,
      poi: [],
    }));
    setData(res);

    // try {
    //   setProgressBar(true);
    //   await axios.get(url).then((res) => {
    //     setProgressBar(false);
    //     setData(res.data);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleTabs = (newValue) => {
    setTab(newValue);
    setMapData({ state: false, data: null });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (mode) => {
    let array = [];
    const temp = data.list.map((item) => {
      if (item.gpsDtl.mode === mode) {
        array.push(item);
      }
    });
    // setFilteredData({ list: array });
    setZoomOut(5);
  };

  console.log("data", filteredData);

  return (
    <>
      <Box>
        {false ? (
          <Box
            sx={{
              position: "absolute",
              margin: "20% 0 0 50%",
              backdropFilter: "blur(800px)",
            }}>
            <CircularProgress sx={{ color: "#f44336" }} />
          </Box>
        ) : (
          <Box>
            <Grid container>
              <Grid
                item
                xs={0.5}
                sx={{ border: "1px solid black", height: "98vh" }}>
                <Sidebar />
              </Grid>
              <Grid item xs={11.5}>
                {/* ....................................................................................Navbar called.............................................................................................. */}

                <Grid container>
                  <Grid item xs={12}>
                    <Navbar />
                  </Grid>

                  {/* .....................................................................................Filters................................................................................. */}

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={9.84}>
                        <Box
                          sx={{
                            paddingLeft: "20px",
                          }}>
                          <Box sx={{ display: "flex", gap: "28px" }}>
                            {Object.values(mode).map((item, index) => (
                              <Button
                                onClick={() => handleTabs(item.value)}
                                key={index}
                                sx={
                                  tab === item.value
                                    ? style.active
                                    : style.notActive
                                }
                                // sx={{ ...style.filter},{tab === item.value ? ...style.active : {}}
                              >
                                {`${item.label} (${
                                  filteredData[item.value]?.length
                                })`}
                              </Button>
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={2} pt={0.4}>
                        <TextField
                          id="search-bar"
                          className="text"
                          label=""
                          variant="outlined"
                          placeholder="Search..."
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* .............................................................................................Cards.......................................................... */}
                  <Grid item xs={4}>
                    <Box sx={{ height: "89vh" }}>
                      <CarDetailsCard
                        data={filteredData[tab]}
                        setMapData={setMapData}
                        mapData={mapData}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: mapData.state ? "block" : "none" }}
                    xs={mapData.state ? 4 : 0}>
                    <SingleCarDetailsCard />
                  </Grid>
                  {/* .............................................................................................Map Component.......................................................... */}
                  <Grid item xs={mapData.state ? 4 : 8}>
                    <MapView
                      data={mapData.state ? mapData.data : filteredData[tab]}
                      zoomControl={4.5}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}
