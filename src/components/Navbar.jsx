import { Box, Button, Typography, Grid } from "@mui/material";
import logo from "../assets/logo.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const styles = {
  button: {
    textTransform: "none",
    height: "30px",
    width: "110px",
    padding: "0px",
    borderColor: "#9a9a9a",
    color: "#333333",
  },
  logo: {
    width: "70px",
    height: "40px",
    marginTop: "-7px",
    objectFit: "content",
  },
  title: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#414d6a",
    paddingTop: "7px",
  },
};

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <Box sx={{ borderBottom: "1px solid #9a9a9a", paddingBottom: "5px" }}>
        <Grid container>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={10}>
            <Box sx={{ width: "50px", height: "30px" }}>
              <img src={logo} style={styles.logo}></img>
            </Box>
          </Grid>
          <Grid item xs={0.4}>
            <Typography sx={styles.title}>itgt</Typography>
          </Grid>
          <Grid item xs={1.4}>
            <Button variant="outlined" sx={styles.button}>
              <LogoutIcon />
              &nbsp; Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
