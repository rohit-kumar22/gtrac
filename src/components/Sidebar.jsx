import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//utils
import { data } from "../../dist/json/navbarData";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = (value) => {
    setOpen(value);
  };

  console.log("sidebar called");

  return (
    <Box
      sx={{ display: "flex", cursor: "pointer" }}
      onMouseOver={() => handleDrawerOpen(true)}
      onMouseOut={() => handleDrawerOpen(false)}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{ position: "absolute", zIndex: 2 }}>
        <List sx={{ paddingTop: "0px" }}>
          {data.map(({ name, Logo }, index) => (
            <ListItem
              key={name}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: name === "Dashboard" ? "#d9d9d9" : "#ffffff",
              }}>
              <ListItemButton
                sx={{
                  minHeight: 55,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <Logo
                    sx={{ color: name === "ITG Telematics" ? "#000000" : "" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  style={{
                    opacity: open ? 1 : 0,
                    fontWeight:
                      name === "ITG Telematics ? 700 : 300 !important",
                    fontSize: "5px !important",
                  }}
                  primaryTypographyProps={{
                    style: {
                      fontWeight: name === "ITG Telematics" ? 800 : 500,
                      fontSize: "14px",
                      color: name === "Dashboard" ? "#1D267D" : "",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
