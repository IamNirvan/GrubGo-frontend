import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import "@fontsource/poppins";

const Dishes = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { sendRequest } = useAxios();

  const loadDishes = async () => {
    console.log("Loading dishes...");

    const result = await sendRequest({
      url: "/v1/dish",
      method: httpMethodTypes.GET,
    });

    const dishes = [];
    result.data.reduce((acc, dish) => {
      acc.push({
        id: dish.id ?? "N/A",
        name: dish.name ?? "N/A",
        noOfReviews: dish.reviews.length ?? 0,
        noOfPortions: dish.dishPortions.length ?? 0,
        created: dish.created ? dish.created.split("T")[0] : "N/A",
        updated: dish.updated ? dish.updated.split("T")[0] : "N/A",
      });
      return acc;
    }, dishes);

    setRows(dishes);
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/dishes/${id}`);
  };

  const handleBarChartClick = (event, dishId) => {
    event.stopPropagation();
    navigate(`/page/metrics/${dishId}`);
  };

  const handleCreateDish = () => {
    navigate("/dishes/create");
  };

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 className="text-[30px] font-bold">Dishes</h1>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleCreateDish}
            style={{ marginLeft: "auto" }}
          >
            Create Dish
          </Button> */}
          <button
            onClick={handleCreateDish}
            className="bg-bg-accent text-fg-activated w-[120px] h-[45px] px-4 rounded-[4px]"
          >
            Create
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  No. of reviews
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  No. of portions
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  Created
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  Updated
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  className="cursor-pointer"
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.noOfReviews}</TableCell>
                  <TableCell>{row.noOfPortions}</TableCell>
                  <TableCell>{row.created}</TableCell>
                  <TableCell>{row.updated}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="view"
                      onClick={(event) => handleBarChartClick(event, row.id)}
                    >
                      <BarChartIcon style={{ cursor: "pointer" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </MainLayout>
  );
};

export default Dishes;
