import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import MainLayout from "../../layouts/MainLayout";
import useAxios from "../../util/useAxios";
import httpMethodTypes from "../../constants/httpMethodTypes";
import { toast } from "react-toastify";

const CreateRule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sendRequest } = useAxios();
  const [rule, setRule] = useState({
    ruleName: "",
    fact: "",
    rule: "",
  });

  const handleEditorChange = (value) => {
    setRule({ ...rule, rule: value });
  };

  const handleCreateDish = async () => {
    if (!rule.ruleName || !rule.fact || !rule.rule) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await sendRequest({
      url: `/v1/rules`,
      method: httpMethodTypes.POST,
      data: [rule],
    });

    if (result.status === 200) {
      toast.success("Rule created successfully");
      navigate("/rules");
    } else {
      toast.error("Failed to create rule");
    }
  };

  return (
    <MainLayout>
      <div className="font-[Poppins] p-[50px]">
        <h1 className="text-[30px] mb-[20px] font-bold">Create Rule</h1>
        <div>
          {/* Rule Name */}
          <TextField
            id="ruleName"
            label="Rule Name"
            name="ruleName"
            value={rule.ruleName}
            onChange={(e) => setRule({ ...rule, ruleName: e.target.value })}
            fullWidth
            margin="normal"
          />

          {/* Fact */}
          <TextField
            id="factName"
            label="Fact Name"
            name="factName"
            value={rule.fact}
            onChange={(e) => setRule({ ...rule, fact: e.target.value })}
            fullWidth
            margin="normal"
          />

          {/* Monaco Editor */}
          <h1 className="text-[25px] mt-[20px] font-bold">Rule Definition</h1>
          <div
            style={{
              height: "400px",
              marginTop: "10px",
              border: "1px solid #c4c4c4", // Same as MUI input field border
              borderRadius: "4px", // Add rounded corners to match TextField
              overflow: "hidden", // Ensures the editor does not spill outside
            }}
          >
            <MonacoEditor
              height="100%"
              // language="javascript" // Syntax highlighting for the rule
              theme="vs-light" // Dark theme (can be 'light')
              value={rule.rule}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                wordWrap: "on",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleCreateDish}
              className="bg-bg-accent text-fg-activated w-[120px] h-[45px] px-4 rounded-[4px] mr-[20px]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateRule;
