import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import "@fontsource/poppins";
import { toast } from "react-toastify";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getBadgeStyle = (status) => {
    switch (status) {
      case "PAID":
        return { backgroundColor: "#D1FAE5", color: "#047857" }; // Green tone
      case "COMPLETED":
        return { backgroundColor: "#DBEAFE", color: "#1E40AF" }; // Blue tone
      case "IN_PROGRESS":
        return { backgroundColor: "#FDE68A", color: "#92400E" }; // Yellow tone
      case "CANCELLED":
        return { backgroundColor: "#FEE2E2", color: "#B91C1C" }; // Red tone
      default:
        return { backgroundColor: "#E5E7EB", color: "#1F2937" }; // Gray for fallback
    }
  };

  return (
    <div
      style={{
        ...getBadgeStyle(status),
        padding: "7px 10px",
        borderRadius: "4px",
        fontWeight: "bold",
        textAlign: "center",
        display: "inline-block",
        minWidth: "100px",
        fontSize: "12px",
      }}
    >
      {status}
    </div>
  );
};

const Orders = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const { errorMessage, sendRequest } = useAxios();

  const loadOrders = async () => {
    console.log("Loading orders...");

    const result = await sendRequest({
      url: "/v1/order",
      method: httpMethodTypes.GET,
    });

    const orders = [];
    result.data.reduce((acc, order) => {
      acc.push({
        id: order.id ?? "N/A",
        total: order.total ?? 0,
        status: order.status ?? "N/A",
        date: order.date ? order.date.split("T")[0] : "N/A",
      });
      return acc;
    }, orders);

    setRows(orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const sendStatusUpdateRequest = async (id, status) => {
    try {
      const response = await sendRequest({
        url: `/v1/order/${id}/status?status=${status}`,
        method: httpMethodTypes.PATCH,
      });
      console.log("response", response);

      if (response.status === 200) {
        toast.success("Order status updated successfully");
        loadOrders();
      }
    } catch (error) {
      console.log("error message", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleMarkAsPaid = async (id) => {
    await sendStatusUpdateRequest(id, "PAID");
  };

  const handleMarkAsInProgress = async (id) => {
    await sendStatusUpdateRequest(id, "IN_PROGRESS");
  };

  const handleMarkAsCompleted = async (id) => {
    await sendStatusUpdateRequest(id, "COMPLETED");
  };

  const handleMarkAsCancelled = async (id) => {
    await sendStatusUpdateRequest(id, "CANCELLED");
  };

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <h1 className="text-[30px] font-bold mb-5">Orders</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["ID", "Total", "Status", "Date", "Quick Actions"].map(
                  (header) => (
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
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <IconButton
                      color="success"
                      onClick={() => handleMarkAsPaid(row.id, "PAID")}
                    >
                      <AttachMoneyIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleMarkAsCompleted(row.id, "COMPLETED")}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() =>
                        handleMarkAsInProgress(row.id, "IN_PROGRESS")
                      }
                    >
                      <AutorenewIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleMarkAsCancelled(row.id, "CANCELLED")}
                    >
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </MainLayout>
  );
};

export default Orders;
