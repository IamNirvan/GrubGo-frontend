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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopBar from "../../layouts/TopBar";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import "@fontsource/poppins";
import { selectUserInfo } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sales = () => {
  const userInfo = useSelector(selectUserInfo);
  const { sendRequest } = useAxios();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addToCartDetails, setAddToCartDetails] = useState({
    dishPortionId: 0,
    quantity: 0,
  });
  const [ruleEvaluationResult, setRuleEvaluationResult] = useState({
    tags: [],
    suggestions: [],
  });
  const [bgTagColorMapping, setBgTagColorMapping] = useState(new Map());

  const loadDishes = async () => {
    const result = await sendRequest({
      url: "/v1/dish?includeImg=true",
      method: httpMethodTypes.GET,
    });
    const dishes = result.data.map((dish) => ({
      id: dish.id ?? "N/A",
      name: dish.name ?? "N/A",
      description: dish.description ?? "N/A",
      image: dish.image
        ? `data:image/jpeg;base64,${dish.image}`
        : "/images/dishes/no-image.png",
      price: dish.dishPortions[0]?.price ?? "N/A",
      noOfPortions: dish.dishPortions.length ?? 0,
      dishPortions: dish.dishPortions,
    }));
    setRows(dishes);
    setFilteredRows(dishes);
  };

  const evaluateRules = async (dishId) => {
    const customerId = userInfo.id;
    if (!customerId) {
      console.warn("Failed to evaluate rules... customer ID not found");
      toast.warn("Failed to evaluate rules");
      return;
    }

    try {
      const response = await sendRequest({
        url: "/v1/rules/evaluate",
        method: httpMethodTypes.POST,
        data: {
          customerId,
          dishId,
        },
      });

      setRuleEvaluationResult({
        tags: response?.data.filter((r) => r.payload.type === "TAG") ?? [],
        suggestions:
          response?.data.filter((r) => r.payload.type === "SUGGESTION") ?? [],
      });
    } catch (error) {
      console.warn("failed to evaluate rules", error);
    }
  };

  const initializeBgTagColorMap = () => {
    const colorMap = new Map();
    colorMap.set("FATAL", {
      bg: "#F3C1C1",
      fg: "#C86A6A",
      border: "#C86A6A",
    });
    colorMap.set("WARNING", {
      bg: "#F6EAA6",
      fg: "#BBA947",
      border: "#BBA947",
    });
    colorMap.set("INFO", {
      bg: "#ADDFC2",
      fg: "#4E946C",
      border: "#4E946C",
    });

    setBgTagColorMapping(colorMap);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(value)
    );
    setFilteredRows(filtered);
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

  // Update the price shown in the modal when the user changes the portion and/or quantity
  useEffect(() => {
    if (selectedDish) {
      const selectedPortion = selectedDish.dishPortions.find(
        (p) => p.id === addToCartDetails.dishPortionId
      );
      console.log("portion = ", selectedPortion);

      if (selectedPortion) {
        const quantity = addToCartDetails.quantity;
        setSelectedDish((prev) => ({
          ...prev,
          price: selectedPortion.price * quantity,
        }));
      }
    }
  }, [addToCartDetails]);

  useEffect(() => {
    loadDishes();
    initializeBgTagColorMap();
  }, []);

  useEffect(() => {
    if (selectedDish) {
      evaluateRules(selectedDish.id);
    }
  }, [selectedDish]);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setAddToCartDetails({
      dishPortionId: dish.dishPortions[0]?.id || 0,
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

    const response = await sendRequest({
      url: `/v1/cart/${cartId}`,
      method: httpMethodTypes.PATCH,
      data: [addToCartDetails],
    });

    console.log("Add to cart response =", response);
    closeModal();
  };

  return (
    <div>
      <TopBar />
      <div
        style={{
          backgroundImage: `url('/images/banner-2.png')`,
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "45px",
          marginRight: "45px",
          marginLeft: "45px",
          borderRadius: "40px",
        }}
      ></div>
      <Container sx={{ marginY: 10 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search for dishes..."
          value={searchText}
          onChange={handleSearchChange}
          sx={{ marginBottom: "20px" }}
        />
        <Grid container spacing={4}>
          {filteredRows.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.id}>
              <Card
                onClick={() => openModal(row)}
                sx={{ cursor: "pointer", boxShadow: 2, borderRadius: "4px" }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={row.image}
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

      {selectedDish && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="lg"
          fullWidth
          PaperProps={{ style: { borderRadius: "4px" } }}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8px)",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            padding="50px"
          >
            <Box flex={1} sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={selectedDish.image}
                alt={selectedDish.name}
                sx={{
                  width: "90%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </Box>

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

              {ruleEvaluationResult.tags.length > 0 && (
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Tags
                    </Typography>
                  </AccordionSummary>
                  {ruleEvaluationResult.tags.map((res, index) => (
                    <AccordionDetails key={index}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={
                          bgTagColorMapping.get(res.payload.status)?.bg ||
                          "#EAEAEA"
                        }
                        padding="10px"
                        borderRadius="4px"
                        border={`1px solid ${
                          bgTagColorMapping.get(res.payload.status)?.border ||
                          "#B0B0B0"
                        }`}
                      >
                        <Typography
                          fontSize="14px"
                          color={
                            bgTagColorMapping.get(res.payload.status)?.fg ||
                            "#B0B0B0"
                          }
                        >
                          {res.payload.text}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  ))}
                </Accordion>
              )}

              {ruleEvaluationResult.suggestions.length > 0 && (
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Suggestions
                    </Typography>
                  </AccordionSummary>
                  {ruleEvaluationResult.suggestions.map((res, index) => (
                    <AccordionDetails key={index}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={
                          bgTagColorMapping.get(res.payload.status)?.bg ||
                          "#EAEAEA"
                        }
                        padding="10px"
                        borderRadius="4px"
                        border={`1px solid ${
                          bgTagColorMapping.get(res.payload.status)?.border ||
                          "#B0B0B0"
                        }`}
                      >
                        <Typography
                          fontSize="14px"
                          color={
                            bgTagColorMapping.get(res.payload.status)?.fg ||
                            "#B0B0B0"
                          }
                        >
                          {res.payload.text}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  ))}
                </Accordion>
              )}

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
