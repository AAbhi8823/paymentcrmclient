import React, { useState } from "react";
import { Box } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

import "./IBTpage.css";
export default function IBTpage() {
  const [receiverBankName, setReceiverBankName] = useState("");
  const [receiverBankAccount, setReceiverBankAccount] = useState("");
  const [senderBank, setSenderBank] = useState("");
  const [senderBankAccount, setSenderBankAccount] = useState();
  const [senderName, setSenderName] = useState("");
  const [utrNo, setUtrNo] = useState("");
  const [amount, setAmount] = useState();
  const [remarks, setRemarks] = useState("");
  const [IFCcode, setIFCode] = useState("");
  const [popup, setPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedDateTime = currentTime.toLocaleString();
  const handleSubmitrequest = () => {
    setPopup(true);
  };
  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleDeposit = () => {
    setPopup(true);
  };
  return (
    <Box m="20px">
      <div className="top-title-deposit">
        <div className="Ibt-trancefer">
          <div className="inttrancefer">
            <form className="ibt-form" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="sender-deteils">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sender Bank</InputLabel>
                  <Select
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                    label="Sender Bank"
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <TextField
                  label="Sender Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={senderName}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setSenderName(inputValue);
                  }}
                />
              </div>
              <div className="sender-deteils">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Reciver Bank</InputLabel>
                  <Select
                    value={receiverBankName}
                    onChange={(e) => setReceiverBankName(e.target.value)}
                    label="Sender Bank"
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                      setAmount(inputValue);
                    }
                  }}
                />
              </div>
              <div className="sender-deteils"></div>
              <div className="sender-deteils">
                <TextField
                  label="Enter UTR"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={utrNo}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                      setUtrNo(inputValue);
                    }
                  }}
                />
                <TextField
                  label="IFC Code"
                  variant="outlined"
                  fullWidth
                  type=""
                  value={IFCcode}
                  onChange={(e) => {
                    let inputValue = e.target.value.toUpperCase(); // Convert to uppercase
                    inputValue = inputValue.slice(0, 11); // Limit to maximum 11 characters

                    if (/^[A-Z0-9]*$/.test(inputValue) || inputValue === "") {
                      // Only allow uppercase letters and numbers
                      setIFCode(inputValue);
                    }
                  }}
                />
              </div>
              <div className="sender-deteils">
                <TextField
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
                 <TextField
                label="Date and Time"
                variant="outlined"
                fullWidth
                value={formattedDateTime}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span role="img" aria-label="clock">
                        🕒
                      </span>
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
              </div>
            
              <div className="button-class">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeposit}
                  style={{ marginTop: "10px" }}
                >
                  Enter
                </Button>
              </div>
             
            </form>
          </div>
        </div>
        {popup && (
          <Box>
            <div className="popup-overlay">
              <div className="popup">
                <p>IBT Details:</p>
                <ul>
                  <li>Sender Bank: {senderBank}</li>
                  <li>Sender name: {senderName}</li>
                  <li>Reciver Bank: {receiverBankName}</li>
                  <li>Amount :{amount} </li>
                  <li>UTR Number:{utrNo}</li>
                  <li>IFC Code: {remarks}</li>
                  <li>Remarks: {remarks}</li>
                </ul>
                <div className="popup-button">
                  <Button
                    variant="contained"
                    color="primary"
                    //  onClick={handleDepositSubmit}
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
