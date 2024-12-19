import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/features/authSlice";
import ingredients from "../../constants/ingredients";

const DishDetail = () => {
  const { id } = useParams();
  const { sendRequest } = useAxios();
  const [imageSrc, setImageSrc] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const [dish, setDish] = useState({
    id: 0,
    name: "",
    description: "",
    dishPortions: [],
    image: "",
    reviews: [],
    created: "",
    updated: "",
    ingredients: [],
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  // const ingredientsList = ["Salt", "Pepper", "Cheese", "Tomato", "Basil"]; // Example options

  const fetchDishById = async (id) => {
    const result = await sendRequest({
      url: `/v1/dish?id=${id}&includeImg=true`,
      method: httpMethodTypes.GET,
    });

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
      ingredients: result.data[0].ingredients ?? [],
      created: result.data[0].created
        ? result.data[0].created.split("T")[0]
        : "N/A",
      updated: result.data[0].updated
        ? result.data[0].updated.split("T")[0]
        : "N/A",
    });
    setSelectedIngredients(result.data[0].ingredients ?? []);
  };

  const updateDish = async () => {
    const formData = new FormData();
    formData.append("requests[0].id", id);
    formData.append("requests[0].name", dish.name);
    formData.append("requests[0].description", dish.description);

    if (selectedIngredients) {
      selectedIngredients.map((ingredient) => {
        formData.append("requests[0].ingredients", ingredient);
      });
    }

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
      navigate("/v1/dishes");
    } else {
      toast.error("Failed to delete dish");
    }
  };

  const handleInputChange = (e) => {
    setDish((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const handleIngredientsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedIngredients(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDeleteIngredient = (ingredientToDelete) => {
    setSelectedIngredients((ingredients) =>
      ingredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };

  useEffect(() => {
    fetchDishById(id);
  }, [id]);

  useEffect(() => {
    console.log("dish ", dish);
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
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Select
              id="ingredients"
              multiple
              value={selectedIngredients}
              onChange={handleIngredientsChange}
              input={<OutlinedInput label="Ingredients" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleDeleteIngredient(value)}
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              )}
              fullWidth
            >
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient.value} value={ingredient.label}>
                  {ingredient.label}
                </MenuItem>
              ))}
            </Select>
            <h1 className="text-[25px] mt-[20px] font-bold">Portions</h1>
            <h3 className="text-[13px] mt-[1px] mb-[30px] text-fg-deactivated">
              All prices shown are in Sri Lankan rupees
            </h3>
            <div>
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
                </div>
              ))}
            </div>
          </div>
          <img
            src={imageSrc ?? "https://via.placeholder.com/150"}
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
      </div>
    </MainLayout>
  );
};

export default DishDetail;
