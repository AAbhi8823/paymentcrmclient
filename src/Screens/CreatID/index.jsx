import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography, useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataTeam } from "../../Data/Mockdata";
import "./CreatId.css";
import InputAdornment from "@mui/material/InputAdornment";
export default function CreatId() {
  const [idname, setIdname] = useState("");
  const [panel, setPanel] = useState("");
  const [popup, setPopup] = useState(false);
  const [remarks,setRemarks] = useState("");
  const[OpeningBalance, setOpeningbalance]=useState()
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formattedDateTime = currentTime.toLocaleString();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const creatNewID = () => {
    console.log("creat new id");
    setPopup(true);
    // navigate('/WithDrawl')
  };
  const handleDepositSubmit = () => {
    setPopup(false);
    navigate("/WithDrawl");
  };
  const handleClosePopup = () => {
    setPopup(false);
  };
  return (
    <Box m="20px">
      <div className="creat-id-main-addbutton">
        <div className="creat-id-main">
          <TextField
            label="Id name"
            variant="outlined"
            fullWidth
            type="idname"
            value={idname}
            onChange={(e) => {
              const inputValue = e.target.value;
              setIdname(inputValue);
            }}
          />
          <FormControl fullWidth variant="outlined">
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
        </div>
        <div className="creat-id-main">
          <TextField
            label="Opening balance"
            variant="outlined"
            fullWidth
            type="number"
            value={OpeningBalance}
            onChange={(e) => {
              const inputValue = e.target.value;
              setOpeningbalance(inputValue);
            }}
          />
          <TextField
            label="Remarks"
            variant="outlined"
            fullWidth
            type="name"
            value={remarks}
            onChange={(e) => {
              const inputValue = e.target.value;
              setRemarks(inputValue);
            }}
          />
          
        </div>
        <div className="button-class-creatid">
          <Button
            variant="contained"
            color="primary"
            onClick={creatNewID}
            style={{ marginTop: "10px" }}
          >
            creat id
          </Button>
        </div>
        {popup && (
          <Box>
            <div className="popup-overlay">
              <div className="popup">
                <p>Deposit Details:</p>
                <ul>
                  <li>Name: {idname}</li>
                  <li>Panel: {panel}</li>
                  <li>OpeningBalance: {panel}</li>
                  <li>remarks: {panel}</li>
                  
                </ul>
                <div className="popup-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDepositSubmit}
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
