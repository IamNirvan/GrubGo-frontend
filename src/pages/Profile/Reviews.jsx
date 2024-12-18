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
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { selectUserInfo } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Reviews = () => {
  const userInfo = useSelector(selectUserInfo);
  const { sendRequest } = useAxios();
  const [rows, setRows] = useState([]);

  // TODO: continue from here... when the user clicks this, open a modal that allows the review to be added...
  const handleReview = () => {};

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

  return (
    <div className="w-[90%] h-[100%] font-[Poppins]">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["Id", "Name", "Actions"].map((header) => (
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
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                className="cursor-pointer"
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="view"
                    onClick={(event) => handleReview(event, row.id)}
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
  );
};

export default Reviews;
