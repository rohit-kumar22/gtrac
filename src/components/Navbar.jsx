import { Box, Button, Typography, Grid } from "@mui/material";
import logo from "../assets/logo.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  return (
    <>
      <Box pt={1} sx={{ borderBottom: "1px solid #9a9a9a" }}>
        <Grid container>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={10}>
            <Box sx={{ width: "50px", height: "50px" }}>
              <img
                src={logo}
                style={{
                  width: "100px",
                  height: "50px",
                  objectFit: "content",
                }}></img>
            </Box>
          </Grid>
          <Grid item xs={0.4}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#414d6a",
                paddingTop: "7px",
              }}>
              itgt
            </Typography>
          </Grid>
          <Grid item xs={1.4}>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              <LogoutIcon />
              &nbsp; Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
