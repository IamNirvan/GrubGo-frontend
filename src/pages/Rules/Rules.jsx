import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import MainLayout from "../../layouts/MainLayout";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";

const Rules = () => {
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxios();
  const [rows, setRows] = useState([]);

  const loadRules = async () => {
    console.log("Loading rules...");

    const result = await sendRequest({
      url: "/v1/rules",
      method: httpMethodTypes.GET,
    });

    const rules = [];
    result.data.reduce((acc, rule) => {
      acc.push({
        id: rule.id ?? "N/A",
        ruleName: rule.ruleName ?? "N/A",
        factName: rule.factName ?? "N/A",
        created: rule.created ? rule.created.split("T")[0] : "N/A",
        updated: rule.updated ? rule.updated.split("T")[0] : "N/A",
      });
      return acc;
    }, rules);

    setRows(rules);
  };

  // Load all the rules when the component mounts
  useEffect(() => {
    loadRules();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/v1/rule/${id}`);
  };

  const handleCreateRule = () => {
    navigate("/v1/rule/create");
  };

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1 className="text-[30px] font-bold">Rules</h1>
          <button
            onClick={handleCreateRule}
            className="bg-bg-accent text-fg-activated w-[120px] h-[45px] px-4 rounded-[4px]"
          >
            Create
          </button>
        </div>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : rows.length == 0 ? (
          <h1>No data</h1>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#FF6B6B" }}>
                  <TableCell
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    Fact name
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    Created
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#FF725E",
                      color: "#FFFFFF",
                      padding: "20px",
                    }}
                  >
                    Updated
                  </TableCell>
                  {/* <TableCell
                  style={{
                    backgroundColor: "#FF725E",
                    color: "#FFFFFF",
                    padding: "20px",
                  }}
                >
                  Actions
                </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    onClick={() => handleRowClick(row.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.ruleName}</TableCell>
                    <TableCell>{row.factName}</TableCell>
                    <TableCell>{row.created}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                    {/* <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => console.log("Edit action")}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </MainLayout>
  );
};

export default Rules;
