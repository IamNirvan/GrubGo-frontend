import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { toast } from "react-toastify";

const DishDetail = () => {
  const { id } = useParams();
  const { errorMessage, loading, sendRequest } = useAxios();
  const [imageSrc, setImageSrc] = useState("");
  const [dish, setDish] = useState({
    id: 0,
    name: "",
    description: "",
    dishPortions: [],
    image: "",
    reviews: [],
    created: "",
    updated: "",
  });
  const navigate = useNavigate();

  const fetchDishById = async (id) => {
    console.log("Fetching dish by id...");

    const result = await sendRequest({
      url: `/v1/dish?id=${id}&includeImg=true`,
      method: httpMethodTypes.GET,
    });
    console.log("result", result);

    if (result.data[0].image) {
      const imageDataUrl = `data:image/jpeg;base64,${result.data[0].image}`;
      setImageSrc(imageDataUrl);
    }

    setDish({
      id: result.data[0].id ?? "N/A",
      name: result.data[0].name ?? "N/A",
      description: result.data[0].description ?? "N/A",
      dishPortions: result.data[0].dishPortions ?? [],
      image: result.data[0].image ?? "N/A",
      reviews: result.data[0].reviews ?? [],
      created: result.data[0].created
        ? result.data[0].created.split("T")[0]
        : "N/A",
      updated: result.data[0].updated
        ? result.data[0].updated.split("T")[0]
        : "N/A",
    });
  };

  const updateDish = async () => {
    const formData = new FormData();
    formData.append("requests[0].id", id);
    formData.append("requests[0].name", dish.name);
    formData.append("requests[0].description", dish.description);

    const result = await sendRequest({
      url: `/v1/dish`,
      method: httpMethodTypes.PATCH,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
      data: formData,
    });

    if (result.status === 200) {
      toast.success("Dish updated successfully");
    } else {
      toast.error("Failed to update dish");
    }
  };

  const deleteDish = async () => {
    const result = await sendRequest({
      url: `/v1/dish?ids=${id}`,
      method: httpMethodTypes.DELETE,
    });

    if (result.status === 200) {
      toast.success("Dish deleted successfully");
      navigate("/dishes");
    } else {
      toast.error("Failed to delete dish");
    }
  };

  const handleInputChange = (e) => {
    setDish((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    fetchDishById(id);
  }, [id]);

  useEffect(() => {
    console.log("Dish", dish);
  }, [dish]);

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <h1 className="text-[30px] mb-[20px] font-bold">{`Dishes #${id}`}</h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <TextField
              id="name"
              label="Name"
              value={dish.name}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              id="description"
              label="Description"
              value={dish.description}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              onChange={handleInputChange}
            />
            <h1 className="text-[25px] mt-[20px] font-bold">Portions</h1>
            <h3 className="text-[13px] mt-[1px] mb-[30px] text-fg-deactivated">
              All prices shown are in Sri Lankan rupees
            </h3>
            <div>
              {/* {["Small", "Medium", "Large"].map((size, index) => ( */}
              {dish.dishPortions.map((portion, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label={portion.portionName}
                    value={portion.price}
                    variant="outlined"
                    style={{ width: "200px" }}
                    disabled
                  />
                  {/* <IconButton color="primary" aria-label="edit portion">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete portion">
                    <DeleteIcon />
                  </IconButton> */}
                </div>
              ))}
            </div>
          </div>
          <img
            src={imageSrc ?? "https://via.placeholder.com/150"} // Replace with actual image source
            alt="Dish"
            style={{ borderRadius: "8px", width: "500px", height: "auto" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="warning"
            style={{ marginRight: "10px" }}
            onClick={updateDish}
          >
            Update
          </Button>
          <Button variant="contained" color="error" onClick={deleteDish}>
            Delete
          </Button>
        </div>

        {/* <h1 className="text-[25px] mb-[20px] mt-[20px] font-bold">Reviews</h1>
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
        </TableContainer> */}
      </div>
    </MainLayout>
  );
};

export default DishDetail;
