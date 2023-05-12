import { Box, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";

const styles = {
  headings: {
    fontSize: "16px",
    fontWeight: 300,
    color: "#58595a",
    paddingTop: "8px ",
    paddingBottom: "8px ",
    borderRadius: "0px",
    textAlign: "center",
    width: "100%",
    textTransform: "none",
    backgroundColor: "#468e82",
  },
};

export default function singleCarDetailsCard() {
  const [activeCard, setCard] = useState(true);
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Button sx={styles.headings}>Journey</Button>
          </Grid>
          <Grid item xs={6}>
            <Button sx={styles.headings}>Vehicle Details</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
