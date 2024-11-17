import React from "react";
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import MainLayout from "../../layouts/MainLayout";

const Rules = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/page/rules/${id}`);
  };

  return (
    <MainLayout>
      <Typography variant="h4" component="h2" gutterBottom>
        Rules
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#FF6B6B" }}>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Fact name
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Active
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Created
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                Updated
              </TableCell>
              <TableCell style={{ color: "#FFFFFF", fontWeight: "bold" }}>
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
              <TableCell>AllergenRule</TableCell>
              <TableCell>DishDetails</TableCell>
              <TableCell>True</TableCell>
              <TableCell>23/07/2024</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => console.log("Edit action")}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default Rules;
