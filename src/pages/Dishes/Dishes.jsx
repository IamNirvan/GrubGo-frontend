import React from "react";
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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";

const Dishes = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/page/dishes/${id}`);
  };

  const handleBarChartClick = (event, dishId) => {
    event.stopPropagation(); // Prevent the row click from firing
    navigate(`/page/metrics/${dishId}`);
  };

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Dishes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  No. of reviews
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  No. of portions
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  Created
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  Updated
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#FF6F61", color: "#FFFFFF" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                onClick={() => handleRowClick(21)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>21</TableCell>
                <TableCell>Chicken Lasagna</TableCell>
                <TableCell>14</TableCell>
                <TableCell>5</TableCell>
                <TableCell>23/10/2024</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="view"
                    onClick={(event) => handleBarChartClick(event, 21)}
                  >
                    <BarChartIcon style={{ cursor: "pointer" }} />
                  </IconButton>
                  <IconButton color="secondary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </MainLayout>
  );
};

export default Dishes;
