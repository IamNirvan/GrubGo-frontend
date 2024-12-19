import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { toast } from "react-toastify";
import ingredients from "../../constants/ingredients";

const CreateDish = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { errorMessage, sendRequest } = useAxios();
  const [imageSrc, setImageSrc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For the image file
  const [dish, setDish] = useState({
    name: "",
    description: "",
    dishPortions: [],
  });
  const [supportedPortions, setSupportedPortions] = useState([]);
  const [portionPrices, setPortionPrices] = useState({});
  const [selectedPortions, setSelectedPortions] = useState({});

  const navigate = useNavigate();

  // Fetch supported portions from API
  useEffect(() => {
    const fetchPortions = async () => {
      const response = await sendRequest({
        url: `/v1/portion`,
        method: httpMethodTypes.GET,
      });
      if (response) {
        setSupportedPortions(response.data);
      }
    };
    fetchPortions();
  }, []);

  const handleInputChange = (e) => {
    setDish((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const handlePortionToggle = (portion) => {
    setSelectedPortions((prevState) => ({
      ...prevState,
      [portion.id]: !prevState[portion.id],
    }));

    // Remove price if unselected
    if (selectedPortions[portion.id]) {
      setPortionPrices((prevState) => {
        const updated = { ...prevState };
        delete updated[portion.id];
        return updated;
      });
    }
  };

  const handlePriceChange = (portion, value) => {
    setPortionPrices({ ...portionPrices, [portion.id]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleCreateDish = async () => {
    if (!dish.name || !dish.description) {
      toast.error("Please fill in all fields");
      return;
    }

    if (Object.keys(selectedPortions).length === 0) {
      toast.error("Please select at least one portion");
      return;
    }

    if (
      Object.keys(portionPrices).length !== Object.keys(selectedPortions).length
    ) {
      toast.error("Please fill in all portion prices");
      return;
    }

    const formData = new FormData();
    formData.append("requests[0].name", dish.name);
    formData.append("requests[0].description", dish.description);

    // Append portions
    let portionIndex = 0;
    for (const portionId in selectedPortions) {
      if (selectedPortions[portionId] && portionPrices[portionId]) {
        formData.append(
          `requests[0].dishPortion[${portionIndex}].portionId`,
          portionId
        );
        formData.append(
          `requests[0].dishPortion[${portionIndex}].price`,
          portionPrices[portionId]
        );
        portionIndex++;
      }
    }

    // Append the image file
    if (selectedImage) {
      formData.append("requests[0].image", selectedImage);
    }

    if (selectedIngredients) {
      selectedIngredients.map((ingredient) => {
        formData.append("requests[0].ingredients", ingredient);
      });
    }

    try {
      const response = await sendRequest({
        url: `/v1/dish`,
        method: httpMethodTypes.POST,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (response.status === 201) {
        console.log("Dish created successfully:", response.data);
        toast.success("Dish created successfully");
        navigate("/v1/dishes");
      } else {
        console.error("Failed to create dish:", response);
        toast.error("Failed to create dish");
      }
    } catch (error) {
      console.error("Error creating dish:", error);
      toast.error("Failed to create dish");
    }
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

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <h1 className="text-[30px] mb-[20px] font-bold">Create Dish</h1>
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
            <div>
              {supportedPortions.map((portion) => (
                <div
                  key={portion.id}
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!selectedPortions[portion.id]}
                        onChange={() => handlePortionToggle(portion)}
                      />
                    }
                    label={portion.name}
                  />
                  {selectedPortions[portion.id] && (
                    <TextField
                      label={`Price for ${portion.name}`}
                      type="number"
                      value={portionPrices[portion.id] || ""}
                      onChange={(e) =>
                        handlePriceChange(portion, e.target.value)
                      }
                      style={{ width: "200px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={imageSrc || "https://via.placeholder.com/150"}
              alt="Dish Preview"
              style={{
                width: "500px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            {/* <button className="bg-bg-accent text-fg-activated w-[150px] h-[45px] px-4 rounded-[4px] mr-[20px]">
              Upload Image */}
            <input
              type="file"
              // hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* </button> */}
          </div>
        </div>
        <button
          onClick={handleCreateDish}
          className="bg-bg-accent text-fg-activated w-[120px] h-[45px] px-4 rounded-[4px] mr-[20px]"
        >
          Create
        </button>
      </div>
    </MainLayout>
  );
};

export default CreateDish;
