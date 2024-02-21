import React, { useState } from "react";
import { Box } from "@mui/material";
import "./Withdrawpage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
export default function WithDrawl() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [userID, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [bonus, setBonus] = useState("");
  const [receivingBank, setReceivingBank] = useState("");
  const [utrNo, setUtrNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [panel, setPanel] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const formattedDateTime = currentTime.toLocaleString();
  const handleWithdrawal = () => {
    console.log(`Withdrawal Amount: ${withdrawalAmount}`);
    setPopup(true);
  };
  const handlCreatId=()=>{
    navigate('/CreatId')
  }
  const handleClosePopup = () => {
    setPopup(false);
  };
  const handleSubmitrequest = () => {
    console.log("Submit request");
    setPopup(false);
  };
  return (
    <Box m="20px">
      <div className="top-title">
        {/* <Header title="Withdraw" subtitle="Welcome to Withdraw"></Header> */}
      </div>
      <div className="withdraw-page">
        <div className="detales-page">
          <form className="form-section">
            <TextField
              label="User Id"
              variant="outlined"
              fullWidth
              type="number"
              value={userID}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                  setUserId(inputValue);
                }
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
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginTop: "10px" }}
            >
              <InputLabel>Panel</InputLabel>
              <Select
                value={panel}
                onChange={(e) => setPanel(e.target.value)}
                label="Panel"
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
                // Check if the input is a non-negative number or an empty string
                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                  setAmount(inputValue);
                }
              }}
            />
            <TextField
              label="Bonus"
              variant="outlined"
              fullWidth
              type="number"
              value={bonus}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Check if the input is a non-negative number or an empty string
                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                  setBonus(inputValue);
                }
              }}
            />
             <FormControl
              fullWidth
              variant="outlined"
              style={{ marginTop: "10px" }}
            >
              <InputLabel>Receiving bank</InputLabel>
              <Select
                value={panel}
                onChange={(e) => setPanel(e.target.value)}
                label="Panel"
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <TextField
              label="UTR NO"
              variant="outlined"
              fullWidth
              type="text"
              value={utrNo}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Check if the input is a non-negative number or an empty string
                if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                  setUtrNo(inputValue);
                }
              }}
            />
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
            <div className="button-withdrawl">
              <Button
              variant="contained"
              color="primary"
              onClick={handleWithdrawal}
              style={{ marginTop: "10px" }}
              
            >
              Enter
            </Button></div>
            
          </form>
          <div className="credat-id-button">
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            Creat ID
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlCreatId}
            style={{ marginTop: "10px" }}
          >
            Creat Id
          </Button>
        </div>
        </div>
        
      </div>
      {popup && (
        <Box>
       <div className="popup-overlay">
       <div className="popup">
         <p>Withdrawal details:</p>
         <ul>
           <li>User ID: {userID}</li>
           <li>Panel: {panel}</li>
           <li>Amount: {amount}</li>
           <li>Bonus: {bonus}</li>
           <li>Receiving Bank: {receivingBank}</li>
           <li>UTR NO: {utrNo}</li>
           <li>Remarks: {remarks}</li>
         </ul>
         <div className="popup-button">
           <Button
             variant="contained"
             color="primary"
             onClick={handleSubmitrequest}
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
    </Box>
  );
}
