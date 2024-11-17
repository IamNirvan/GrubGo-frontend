import React from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const RuleDetails = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <Typography variant="h4" component="h2" gutterBottom>
        Rule #{id}
      </Typography>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <TextField
          label="Rule Name"
          value="AllergenRule"
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Fact"
          value="DishDetails"
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <Typography variant="h6" component="h3" gutterBottom>
          Rule definition
        </Typography>
        <Paper
          style={{
            padding: "15px",
            backgroundColor: "#f5f5f5",
            marginTop: "10px",
          }}
        >
          <pre>
            {`rule AllergenRule "check if customer is allergic to dish" salience 10 {
  when
    (DDF.StringListsHaveMatchingItem(DDF.Dish.Ingredients, DDF.Customer.Allergens))
  then
    DDF.AddResponseComponent("TAG", "NEGATIVE", "This dish happens to have an ingredient you are allergic to");
    Retract("AllergenRule");
}`}
          </pre>
        </Paper>
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
      </Paper>
    </MainLayout>
  );
};

export default RuleDetails;
