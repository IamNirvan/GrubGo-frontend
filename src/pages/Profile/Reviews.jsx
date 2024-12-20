import React, { useEffect, useState } from "react";
import styles from "./formStyles.module.css";
import "@fontsource/poppins";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { AddComment, Padding } from "@mui/icons-material";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { selectUserInfo } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Reviews = () => {
  const userInfo = useSelector(selectUserInfo);
  const { loading, sendRequest } = useAxios();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentDish, setCurrentDish] = useState({
    dishId: 0,
    dishName: "",
    dishPortionCartId: 0,
  });
  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  // Load all dishes that need to be reviewed
  const loadDishes = async () => {
    const customerId = userInfo.id;
    if (!customerId) {
      console.error("Customer ID not found in user info");
      toast.error("Failed to load dishes to be reviewed");
      return;
    }

    const response = await sendRequest({
      url: `/v1/dish/review/pending?customerId=${customerId}`,
      method: httpMethodTypes.GET,
    });

    if (response) {
      setRows(response.data);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  // Open modal and set current dish ID
  const handleReview = (event, dishId, dishName, dishPortionCartId) => {
    event.stopPropagation();
    setCurrentDish({
      dishId: dishId,
      dishName: dishName,
      dishPortionCartId: dishPortionCartId,
    });
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setReviewData({ title: "", description: "", rating: 0 });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // Submit review
  const handleSubmitReview = async () => {
    const customerId = userInfo.id;
    if (!customerId) {
      console.error("Customer ID not found in user info");
      toast.error("Failed to load dishes to be reviewed");
      return;
    }

    if (!reviewData.title || !reviewData.description || !reviewData.rating) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await sendRequest({
        url: `/v1/reviews`,
        method: httpMethodTypes.POST,
        data: [
          {
            dishId: currentDish.dishId,
            customerId: customerId,
            title: reviewData.title,
            content: reviewData.description,
            rating: Number(reviewData.rating),
            dishPortionCartId: currentDish.dishPortionCartId,
          },
        ],
      });

      if (response.status === 200) {
        toast.success("Review submitted successfully");
        loadDishes(); // Reload dishes after submission
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="w-[90%] h-[100%] font-[Poppins]">
      {/* Table for dishes */}

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : rows.length == 0 ? (
        <div className="w-full min-h-[80%] flex flex-col items-center">
          <img
            src="/images/no_data.png"
            alt="No data"
            className="w-[500px] h-[500px]"
          />
          <h3 className="text-[20px]">No data</h3>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Id", "Name", "Ordered Date", "Actions"].map((header) => (
                  <TableCell
                    key={header}
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.dishId} className="cursor-pointer">
                  <TableCell>{row.dishId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.orderDate}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="add-review"
                      onClick={(event) =>
                        handleReview(
                          event,
                          row.dishId,
                          row.name,
                          row.dishPortionCartId
                        )
                      }
                    >
                      <AddComment style={{ cursor: "pointer" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Review Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{currentDish.dishName}</DialogTitle>
        <DialogContent>
          <TextField
            label="Review Title"
            name="title"
            value={reviewData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Review Description"
            name="description"
            value={reviewData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={reviewData.rating}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5 }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button> */}
          {/* <Button
            onClick={handleSubmitReview}
            variant="contained"
            color="primary"
          >
            Submit Review
          </Button> */}
          <button
            onClick={handleSubmitReview}
            className="w-full mt-8 py-3 bg-[#FF725E] text-[16px] text-white font-bold rounded-lg hover:bg-[#FF725E] focus:outline-none focus:ring-2 focus:ring-[#FF725E]"
          >
            Submit Review
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Reviews;
