import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { useParams } from "react-router-dom";
import httpMethodTypes from "../../constants/httpMethodTypes";
import useAxios from "../../util/useAxios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const DishMetrics = () => {
  const { id } = useParams();
  const { errorMessage, loading, sendRequest } = useAxios();
  const [selectedTab, setSelectedTab] = useState(1);
  const [metrics, setMetrics] = useState({
    unitsSoldToday: 5,
    unitsSoldThisQuarter: 237,
    revenueAccountedFor: 23,
    monthlySales: [
      {
        month: "January",
        unitsSold: 0,
      },
      {
        month: "February",
        unitsSold: 0,
      },
      {
        month: "March",
        unitsSold: 0,
      },
      {
        month: "April",
        unitsSold: 0,
      },
      {
        month: "May",
        unitsSold: 0,
      },
      {
        month: "June",
        unitsSold: 0,
      },
      {
        month: "July",
        unitsSold: 0,
      },
      {
        month: "August",
        unitsSold: 0,
      },
      {
        month: "September",
        unitsSold: 0,
      },
      {
        month: "October",
        unitsSold: 0,
      },
      {
        month: "November",
        unitsSold: 0,
      },
      {
        month: "December",
        unitsSold: 0,
      },
    ],
  });
  const [salesData, setSalesData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (Units)",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  });

  // const [cardDetails, setCardDetails] = useState({
  //   unitsSoldToday: 55,
  //   unitsSoldThisQuarter: 237,
  //   revenueAccountedFor: 23,
  // });

  // const handleTabChange = (event, newTab) => {
  //   if (newTab) setSelectedTab(newTab);
  // };

  // Chart Data
  // const salesData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "Sales (Units)",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: "rgba(75,192,192,0.6)",
  //     },
  //   ],
  // };

  const loadMetrics = async () => {
    const response = await sendRequest({
      url: `v1/dish/metrics/${id}`,
      method: httpMethodTypes.GET,
    });

    console.log("response", response);

    setMetrics({
      unitsSoldToday: response.data.unitsSoldToday,
      unitsSoldThisQuarter: response.data.unitsSoldThisQuarter,
      revenueAccountedFor: response.data.revenueAccountedFor,
      monthlySales: [...metrics.monthlySales, ...response.data.monthlySales],
    });

    setSalesData({
      ...salesData,
      labels: response.data.monthlySales.map((item) => item.month),
      datasets: [
        {
          ...salesData.datasets[0],
          data: response.data.monthlySales.map((item) => item.unitsSold),
        },
      ],
    });
  };

  // Load the dish metrics data
  useEffect(() => {
    loadMetrics();
  }, []);

  useEffect(() => {
    console.log("Metrics", metrics);
  }, [metrics]);

  // const peakHoursData = {
  //   labels: ["12 AM", "6 AM", "12 PM", "6 PM", "9 PM"],
  //   datasets: [
  //     {
  //       label: "Orders",
  //       data: [10, 25, 50, 75, 40],
  //       borderColor: "#FF725E",
  //       backgroundColor: "rgba(255,114,94,0.4)",
  //       tension: 0.3,
  //     },
  //   ],
  // };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 64px)",
          gap: "16px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Metric Cards */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent
                  sx={{ textAlign: "center", backgroundColor: "#F4F4F4" }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {metrics.unitsSoldToday}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Units sold today
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent
                  sx={{ textAlign: "center", backgroundColor: "#F4F4F4" }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {metrics.unitsSoldThisQuarter}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Units sold this quarter
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent
                  sx={{ textAlign: "center", backgroundColor: "#F4F4F4" }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {`${metrics.revenueAccountedFor}%`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Revenue accounted for
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Chart Section */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <h1 className="text-[30px] font-bold mt-[20px] mb-[20px]">
              {selectedTab === 1 ? "Sales Report" : "Peak Order Hours"}
            </h1>

            {/* Tab Switch */}
            {/* <ToggleButtonGroup
              value={selectedTab}
              exclusive
              onChange={handleTabChange}
              sx={{ mb: 2 }}
            >
              <ToggleButton value={1}>Sales report</ToggleButton>
              <ToggleButton value={2}>Peak hours</ToggleButton>
            </ToggleButtonGroup> */}

            {/* Chart Rendering */}
            <Box
              sx={{
                backgroundColor: "#F4F4F4",
                borderRadius: "4px",
                flex: 1,
                padding: "10px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative", // Ensure chart fills container
                }}
              >
                {
                  // selectedTab === 1 ? (
                  <Bar
                    data={salesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Allow chart to fill container
                      plugins: {
                        legend: { position: "top" },
                      },
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                  // )
                  // : (
                  //   <Line
                  //     data={peakHoursData}
                  //     options={{
                  //       responsive: true,
                  //       maintainAspectRatio: false, // Allow chart to fill container
                  //       plugins: {
                  //         legend: { position: "top" },
                  //       },
                  //       scales: {
                  //         y: { beginAtZero: true },
                  //       },
                  //     }}
                  //   />
                  // )
                }
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderLeft: "1px solid #E0E0E0",
            paddingLeft: 2,
            height: "100%",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            ASBA results
          </Typography>

          {/* Positive & Negative Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              disabled
              sx={{ backgroundColor: "#E0E0E0", color: "#6B6B6B" }}
            >
              Positive (12)
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#FF725E" }}>
              Negative (7)
            </Button>
          </Box>

          {/* Placeholder for ASBA chart */}
          <Box
            sx={{
              backgroundColor: "#D9D9D9",
              borderRadius: "4px",
              flex: 1,
            }}
          />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DishMetrics;
