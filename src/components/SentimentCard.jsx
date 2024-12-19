import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const SentimentCard = ({ aspect, positive, neutral, negative }) => {
  return (
    <Card variant="outlined" sx={{ padding: "10px", borderRadius: "4px" }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "left", fontSize: "15px", color: "#969696" }}
        >
          Aspect:
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "left", marginBottom: "10px" }}
        >
          {aspect}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: "#ADDFC2",
                borderRadius: "4px",
                textAlign: "center",
                padding: "10px",
                border: "1px solid #4E946C",
              }}
            >
              <Typography variant="h5" fontWeight="semi-bold" color="#4E946C">
                {positive}%
              </Typography>
              <Typography variant="body2" color="#4E946C">
                Positive
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: "#F6EAA6",
                borderRadius: "8px",
                textAlign: "center",
                padding: "10px",
                border: "1px solid #BBA947",
              }}
            >
              <Typography variant="h5" fontWeight="semi-bold" color="#BBA947">
                {neutral}%
              </Typography>
              <Typography variant="body2" color="#BBA947">
                Neutral
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: "#F3C1C1",
                borderRadius: "8px",
                textAlign: "center",
                padding: "10px",
                border: "1px solid #C86A6A",
              }}
            >
              <Typography variant="h5" fontWeight="semi-bold" color="#C86A6A">
                {negative}%
              </Typography>
              <Typography variant="body2" color="#C86A6A">
                Negative
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SentimentCard;
