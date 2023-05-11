import { useState, useEffect } from "react";
// import { Box, Grid, Button, CircularProgress, Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Sidebar from "./Sidebar";
import CarDetailsCard from "./CarDetailsCard";
import Navbar from "./Navbar";
import axios from "axios";
import MapView from "./MapView";

const style = {
  notActive: {
    display: "inline-block",
    fontSize: "16px",
    minwidth: "65px",
    color: "#5cb85c",
    textTransform: "none",
    fontWeight: 600,
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

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [progressBar, setProgressBar] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [tab, setTab] = useState("three");
  const [mode, setMode] = useState([
    { title: "Running", value: "one", count: 0 },
    { title: "Idle", value: "two", count: 0 },
    { title: "All", value: "three", count: 0 },
    { title: "POI", value: "four", count: 0 },
  ]);
  var stopped = 0;
  var running = 0;

  const url =
    "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

  const getData = async () => {
    // debugger;
    setProgressBar(true);

    const response = await fetch(url);
    const res = await response.json();

    setProgressBar(false);
    setFilteredData(res);
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
    if (newValue === "one") {
      const running = data?.list.filter((item) => {
        console.log("speed", item.gpsDtl.speed);
        return Number(item.gpsDtl.speed) > 0;
      });
      console.log("running", running);
      setFilteredData({ list: running });
    } else if (newValue === "two") {
      const stopped = data?.list.filter((item) => {
        return item.gpsDtl.speed === 0 || item.gpsDtl.speed === "";
      });
      console.log("stopped", stopped);
      setFilteredData({ list: stopped });
    } else if (newValue === "three") {
      setFilteredData(data);
    }
    setTab(newValue);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {
    let st = 0;
    let rn = 0;
    let all = data?.list.length;
    data?.list.forEach((item) => {
      if (item.gpsDtl.speed === 0 || item.gpsDtl.speed === "") {
        st++;
      } else {
        rn++;
      }
    });
    setMode([
      { title: "Running", value: "one", count: rn },
      { title: "Idle", value: "two", count: st },
      { title: "All", value: "three", count: all },
      { title: "POI", value: "four", count: 0 },
    ]);
  }, [data]);

  const handleFilter = (mode) => {
    let array = [];
    const temp = data.list.map((item) => {
      if (item.gpsDtl.mode === mode) {
        array.push(item);
      }
    });
    setFilteredData({ list: array });
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
                    <Box
                      sx={{
                        borderBottom: "1px solid black",
                        paddingLeft: "20px",
                      }}>
                      <Box sx={{ display: "flex", gap: "28px" }}>
                        {mode.map((item, index) => (
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
                            {`${item.title} (${item.count})`}
                          </Button>
                        ))}
                      </Box>
                      {/* <Tabs
                        value={tab}
                        onChange={handleTabs}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#5cb85c",

                            "& .MuiTab-root.Mui-selected": {
                              color: "red",
                            },
                          },
                        }}>
                        {mode.map((tab, index) => (
                          <Tab
                            key={index}
                            value={tab.value}
                            label={`${tab.title} (${tab.count})`}
                            sx={{
                              border: "none",
                              textTransform: "none",
                              color: "#5cb85c",
                            }}
                          />
                        ))}
                      </Tabs> */}
                    </Box>
                  </Grid>
                  {/* .............................................................................................Cards.......................................................... */}
                  <Grid item xs={4}>
                    <Box sx={{ height: "89vh" }}>
                      <CarDetailsCard data={filteredData} />
                    </Box>
                  </Grid>
                  <Grid item xs={0}></Grid>
                  {/* .............................................................................................Map Component.......................................................... */}
                  <Grid item xs={8}>
                    <MapView data={filteredData} zoomControl={4.5} />
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
