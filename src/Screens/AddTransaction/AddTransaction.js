import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { base_url } from "../../Utils/Baseurl";
import { auth_token } from "../../Utils/Baseurl";
export default function AddTransaction() {
  const [Transaction, setTransaction] = useState("");
  const [panel, setPanel] = useState("");
  const [popup, setPopup] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [Mode, setMode] = useState("");
  const [bakFrom, setbankform] = useState("");
  const [toBank, setTobank] = useState("");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const usertoken=auth_token.split('.');
  console.log("Form data submitted successfully",usertoken[0]);
  const creatNewID = () => {
    console.log("creat new id");
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };
  // const hadleSubmit = () => {};
  const handleSubmit = async () => {
    // Prepare data object with form values
    const data = {
      transaction_type:Transaction,
      transaction_mode:Mode,
      bank_from:bakFrom,
      bank_to:toBank,
      amount:amount,
      remarks:remarks,
    };

    try {
      // Make API request to submit form data
      const response = await fetch(`${base_url}transaction/add-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth_token}`
        },
        body: JSON.stringify(data),
      });

      // Check if request was successful
      if (response.ok) {
        // Handle success scenario (e.g., show success message, redirect user)
        console.log("Form data submitted successfully");
        handleClosePopup(); // Close the popup after submitting the form
      } else {
        // Handle error scenario (e.g., show error message)
        console.error("Failed to submit form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };
 
  return (
    <Box m="20px">
      <div className="creat-id-main-addbutton">
        <h1>Add Transaction</h1>
        <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            value={Transaction}
            onChange={(e) => setTransaction(e.target.value)}
            label="Transaction Type"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel>Mode</InputLabel>
          <Select
            value={Mode}
            onChange={(e) => setMode(e.target.value)}
            label="Mode"
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Bank">Bank</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px", marginRight: "10px" }}
          >
            <InputLabel>From Bank</InputLabel>
            <Select
              value={bakFrom}
              onChange={(e) => setbankform(e.target.value)}
              label="From Bank"
            >
              <MenuItem value="690510110012668">690510110012668</MenuItem>
              <MenuItem value="690510110012712">690510110012712</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px" }}
          >
            <InputLabel>To Bank</InputLabel>
            <Select
              value={toBank}
              onChange={(e) => setTobank(e.target.value)}
              label="To Bank"
            >
              <MenuItem value="690510110012658">690510110012658</MenuItem>
              <MenuItem value="690510110012432">690510110012432</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </div>

        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          type="number"
          value={amount}
          onChange={(e) => {
            const inputValue = e.target.value;
            setAmount(inputValue);
          }}
          style={{ marginTop: "20px" }}
        />
        <TextField
          style={{ marginTop: "20px" }}
          label="Remarks"
          variant="outlined"
          fullWidth
          type="text"
          value={remarks}
          onChange={(e) => {
            const inputValue = e.target.value;
            setRemarks(inputValue);
          }}
        />
        <div className="button-class-creatid">
          <Button
            variant="contained"
            color="primary"
            onClick={creatNewID}
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </div>
        {popup && (
          <Box>
            <div className="popup-overlay">
              <div className="popup">
                <p>Deposit Details:</p>
                <ul>
                  <li>Transaction Type: {Transaction}</li>
                  <li>Mode: {Mode}</li>
                  <li>From Bank: {bakFrom}</li>
                  <li>To Bank: {toBank}</li>
                  <li>Amount: {panel}</li>
                  <li>Remarks: {panel}</li>
                </ul>
                <div className="popup-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    OK
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        )}
      </div>
    </Box>
  );
}
