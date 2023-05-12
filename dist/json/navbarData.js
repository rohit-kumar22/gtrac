import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";

export const data = [
  {
    name: "Dashboard",
    logo: DashboardIcon,
    path: "/dashboard",
  },
  {
    name: "Vehicles",
    logo: { LocalShippingIcon },
    path: "",
  },
  {
    name: "Plan",
    logo: { BorderColorIcon },
    path: "",
  },
  {
    name: "Trips",
    logo: { ShowChartIcon },
    path: "",
  },
  {
    name: "Settings",
    logo: { SettingsIcon },
    path: "",
  },
];
