import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Container,
  Select,
  MenuItem,
  Dialog,
  TextField,
  Box,
} from "@mui/material";
import TopBar from "../../layouts/TopBar";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import "@fontsource/poppins";
import { selectUserInfo } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";

const Sales = () => {
  const userInfo = useSelector(selectUserInfo);
  const { sendRequest } = useAxios();

  const [rows, setRows] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addToCartDetails, setAddToCartDetails] = useState({
    dishPortionId: 0,
    quantity: 0,
  });

  const loadDishes = async () => {
    const result = await sendRequest({
      url: "/v1/dish?includeImg=true",
      method: httpMethodTypes.GET,
    });
    const dishes = result.data.map((dish) => ({
      id: dish.id ?? "N/A",
      name: dish.name ?? "N/A",
      description: dish.description ?? "N/A",
      image: dish.image ? `data:image/jpeg;base64,${dish.image}` : null,
      price: dish.dishPortions[0]?.price ?? "N/A",
      noOfPortions: dish.dishPortions.length ?? 0,
      dishPortions: dish.dishPortions,
    }));
    setRows(dishes);
  };

  const handleQuantityChange = (e) => {
    setAddToCartDetails((prevDetails) => ({
      ...prevDetails,
      quantity: Number(e.target.value),
    }));
  };

  const handleDishPortionChange = (e) => {
    setAddToCartDetails((prevDetails) => ({
      ...prevDetails,
      dishPortionId: e.target.value,
    }));
  };

  useEffect(() => {
    loadDishes();
    console.log("userInfo = ", userInfo);
  }, []);

  // useEffect(() => {
  //   console.log("rows = ", rows);
  // }, [rows]);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setAddToCartDetails({
      dishPortionId: dish.dishPortions[0].id,
      quantity: 1,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const handleAddToCart = async () => {
    const cartId = userInfo.cartId;
    if (!cartId) {
      console.error(
        "Cart ID not found in user info... Not adding item to cart"
      );
      return;
    }

    console.log("payload = ", [addToCartDetails]);

    const response = await sendRequest({
      url: `/v1/cart/${cartId}`,
      method: httpMethodTypes.PATCH,
      data: [addToCartDetails],
    });

    console.log("add to cart response = ", response);
  };

  return (
    <div>
      <TopBar />
      {/* Hero Section */}
      {/* <div
        style={{
          backgroundImage: `url('/images/banner-2.png')`,
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> */}
      <Container sx={{ marginY: 4 }}>
        <Grid container spacing={4}>
          {rows.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.id}>
              <Card
                onClick={() => openModal(row)}
                sx={{ cursor: "pointer", boxShadow: 2, borderRadius: "4px" }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={row.image ?? "/images/dishes/no-image.png"}
                  alt={row.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {row.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    LKR {row.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal */}
      {selectedDish && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="lg"
          fullWidth
          PaperProps={{ style: { borderRadius: "4px" } }}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent black
              backdropFilter: "blur(8px)", // Blurred background
            },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            padding="50px"
          >
            {/* Left Side: Dish Image */}
            <Box flex={1} sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={selectedDish.image ?? "/images/dishes/no-image.png"}
                alt={selectedDish.name}
                sx={{
                  width: "90%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </Box>

            {/* Right Side: Details */}
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {selectedDish.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  LKR {selectedDish.price}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {selectedDish.description}
                </Typography>
              </Box>

              {/* Portion and Quantity Inputs */}
              <Box display="flex" gap={2} mb={3}>
                <TextField
                  label="Portion"
                  select
                  defaultValue={addToCartDetails.dishPortionId}
                  onChange={handleDishPortionChange}
                  fullWidth
                  size="small"
                >
                  {selectedDish.dishPortions.map((portion) => (
                    <MenuItem key={portion.id} value={portion.id}>
                      {portion.portionName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Quantity"
                  type="number"
                  defaultValue={addToCartDetails.quantity}
                  onChange={handleQuantityChange}
                  fullWidth
                  size="small"
                  inputProps={{ min: 1 }}
                />
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="error"
                fullWidth
                size="large"
                onClick={handleAddToCart}
                sx={{ fontWeight: "bold", textTransform: "none" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </div>
  );
};

export default Sales;
