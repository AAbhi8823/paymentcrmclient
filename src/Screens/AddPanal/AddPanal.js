import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
export const AddPanal = () => {
  const [PanelName,setPanelName]  =useState()
  const [Openingbalance,setOpeningbalance]=useState()
  const [popup, setPopup] = useState(false);
  const [remarks,setRemarks] = useState("");
  const [Mode,setMode]=useState("");
  const [bakFrom,setbankform]=useState("");
  const [amount,setAmount]=useState()
  const navigate = useNavigate();
  const theme = useTheme();

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
  }
  return (
    <Box m="20px">
      <div className="creat-id-main-addbutton">
        <h1>Add Panal</h1>
          <TextField
            label="Panel Name"
            variant="outlined"
            fullWidth
            type="text"
            value={PanelName}
            onChange={(e) => {
              const inputValue = e.target.value;
              setPanelName(inputValue);
            }}
            style={{marginTop:'10px'}}
          />
          <TextField
            label="Opening balance"
            variant="outlined"
            fullWidth
            type="number"
            value={Openingbalance}
            onChange={(e) => {
              const inputValue = e.target.value;
              setOpeningbalance(inputValue);
            }}
            style={{marginTop:'30px'}}
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
            style={{marginTop:'30px'}}
          />
        <div className="button-class-creatid">
          <Button
            variant="contained"
            color="primary"
            onClick={creatNewID}
            style={{ marginTop: "30px" }}
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
                  <li>Panel Name: {PanelName}</li>
                  <li>Openingbalance: {Openingbalance}</li>
                  <li>Remarks: {remarks}</li>
                </ul>
                <div className="popup-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{console.log('ankur')}}
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
