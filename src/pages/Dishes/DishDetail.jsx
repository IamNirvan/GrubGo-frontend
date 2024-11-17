import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DishDetail = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Dish #{id}
        </Typography>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <TextField
              label="Name"
              value="Chicken Lasagna"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Description"
              value="Hearty dish that layers tender chicken, creamy béchamel sauce, and rich tomato sauce"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              disabled
            />
            <Typography variant="h6" gutterBottom>
              Portions
            </Typography>
            <div>
              {["Small", "Medium", "Large"].map((size, index) => (
                <div
                  key={size}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label={size}
                    value={`${[1800, 2800, 6100][index]} LKR`}
                    variant="outlined"
                    disabled
                    style={{ width: "200px" }}
                  />
                  <IconButton color="primary" aria-label="edit portion">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete portion">
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://via.placeholder.com/150" // Replace with actual image source
            alt="Dish"
            style={{ borderRadius: "8px", width: "250px", height: "auto" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="warning"
            style={{ marginRight: "10px" }}
          >
            Update
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </div>

        <Typography variant="h6" style={{ marginTop: "30px" }}>
          Reviews
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>71</TableCell>
                <TableCell>Delicious Lasagna!</TableCell>
                <TableCell>
                  The chicken lasagna was absolutely delicious!
                </TableCell>
                <TableCell>3</TableCell>
                <TableCell>23/07/2024</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </MainLayout>
  );
};

export default DishDetail;
