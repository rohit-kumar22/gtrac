import React from "react";
import { data } from "../../public/json/navbarData";
import { Box, Button, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";

const styles = {
  button: {
    textTransform: "none",
  },
  logo: {
    color: "#9a9a9a",
    marginBottom: "20px",
  },
  tooltip: {
    "& .MuiTooltip-tooltip": {
      width: "92px",
      height: "36px",
      borderRadius: "18px",
      boxShadow: "0 20px 80px 0",
      backgroundColor: "red",
    },
  },
};

export default function Sidebar() {
  return (
    <>
      <Box
        sx={{
          wordBreak: "break-word",
          textAlign: "center",
        }}>
        <Box mb={2}>
          <Button>
            <MenuIcon />
          </Button>
        </Box>
        <Tooltip title="Dashboard" placement="right" sx={styles.tooltip}>
          <Button sx={styles.logo}>
            <DashboardIcon />
          </Button>
        </Tooltip>
        <Button sx={styles.logo}>
          <LocalShippingIcon />
        </Button>
        <Button sx={styles.logo}>
          <BorderColorIcon />
        </Button>
        <Button sx={styles.logo}>
          <ShowChartIcon />
        </Button>
      </Box>
    </>
  );
}
