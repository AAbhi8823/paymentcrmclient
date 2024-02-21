import React, { useState, useRef, useEffect } from "react";
import { tokens } from "../../theme";
import Switch from "@mui/material/Switch";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Box } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
export const AddAgent = () => {
  const [agentName, setAgentname] = useState("");
  const [shift, setShift] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [remarks, setRemarks] = useState("");
  const [role, setRole] = useState("");
  const [popup, setPopup] = useState(false);
  const [joiningDate, setJoiningDate] = useState(null);
  const [visaRenewed, setVisaRenewed] = useState(null);
  const formRef = useRef(null);

  const handleAddAgent = () => {
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  const handleSubmit = () => {
    // Send data to the server
    // Example: You can use fetch or axios to make an API call
    console.log("Submitting data to the server...");
    // After submitting data, you may want to reset the form fields
    setAgentname("");
    setShift("");
    setSalary("");
    setAddress("");
    setReference("");
    setRemarks("");
    setRole("");
  };

  return (
    <Box m="20px">
      <div className="top-title-deposit">
        <div className="Ibt-trancefer">
          <div className="inttrancefer">
            <form className="ibt-form" ref={formRef} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="sender-deteils" style={{ fontSize: "15px" }}>
                <TextField
                  label="Agent name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentname(e.target.value)}
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Shift </InputLabel>
                  <Select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    label="Account Type"
                  >
                    <MenuItem value="Option 1">Day</MenuItem>
                    <MenuItem value="Option 2">Night</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </div>
              <div className="sender-deteils" style={{ fontSize: "15px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Joining Date"
                    value={joiningDate}
                    onChange={(date) => setJoiningDate(date)}
                  />
                </LocalizationProvider>
                <TextField
                  label="Salary"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="sender-deteils" style={{ fontSize: "15px" }}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Visa Renewed"
                    value={visaRenewed}
                    onChange={(date) => setVisaRenewed(date)}
                  />
                </LocalizationProvider>
              </div>
              <div className="sender-deteils" style={{ fontSize: "15px" }}>
                <TextField
                  label="Reference"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
                <TextField
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <div className="sender-deteils" style={{ fontSize: "15px" }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Role </InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="setRole"
                  >
                    <MenuItem value="Deposit">Deposit</MenuItem>
                    <MenuItem value="withdrawl">withdrawl</MenuItem>
                    <MenuItem value="Parking">Parking</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </div>
              <div className="button-class">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddAgent}
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
                <p>Add Agent</p>
                <ul>
                  <li>Agent name: {agentName}</li>
                  <li>Shift: {shift}</li>
                  <li>Joining Date: {joiningDate ? joiningDate.format('YYYY-MM-DD') : ''}</li>
                  <li>Salary: {salary}</li>
                  <li>Address: {address}</li>
                  <li>Visa Renewed: {visaRenewed ? visaRenewed.format('YYYY-MM-DD') : ''}</li>
                  <li>Reference: {reference}</li>
                  <li>Remarks: {remarks}</li>
                  <li>Role: {role}</li>
                </ul>
                <div className="popup-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                      handleClosePopup();
                    }}
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
};
