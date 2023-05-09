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

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [progressBar, setProgressBar] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [tab, setTab] = useState("one");
  const [mode, setMode] = useState({
    stoppedCars: null,
    runningCars: null,
    notWorkingCars: null,
  });
  var stopped = 0;
  var running = 0;

  const tabHeadings = [
    { value: "one", label: `Running (${running?.length})` },
    { value: "two", label: "Idle" },
    { value: "three", label: `All (${data?.list.length})` },
    { value: "four", label: "POI" },
  ];

  const url =
    "http://gtrac.in:8080/trackingdashboard/getListVehicles?token=53096";

  const getData = async () => {
    // debugger;
    setProgressBar(true);
    const response = await fetch(url);
    const res = await response.json();
    setProgressBar(false);
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

  const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    console.log("called");
    getData();
    console.log("end");
  }, []);

  useEffect(() => {
    data?.list.map((item) => {
      console.log(item.gpsDtl.mode);
      if (item.gpsDtl.mode === "STOPPED") {
        stopped++;
      } else if (item.gpsDtl.mode === "RUNNING") {
        running++;
      }
    });
    setMode({
      stoppedCars: stopped,
      runningCars: running,
      notWorkingCars: null,
    });
    setFilteredData(data);
  }, []);

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

  console.log("data", data);
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
                sx={{ border: "1px solid black", height: "100vh" }}>
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
                    <Box sx={{ borderBottom: "1px solid black" }}>
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
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <CarDetailsCard data={data} />
                </Grid>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}
