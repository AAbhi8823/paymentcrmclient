import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockBankDataTeam } from "../../Data/Mockdata";
import dayjs from "dayjs";
import "./Index.css";
import { tokens } from "../../theme";
import Switch from "@mui/material/Switch";
import DatePicker from "@mui/lab/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { base_url } from "../../Utils/Baseurl";
export default function Index() {
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [openingDate, setOpeningDate] = useState(null);
  const [closingDate, setClosingDate] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [rent, setRent] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [closingBalance, setClosingBalance] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [popup, setPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addBankForm, setAddBankForm] = useState(false);
  const [formRendered, setFormRendered] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null); // State to store the selected bank for editing
  const [Reference, setReference] = useState("");
  const [rowData, setRowData] = useState(/* your initial row data */);
  const formRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Tokens =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1N2MxYWI2NGMxYzVlMjM2NWRkNDVmOSIsIm5hbWUiOiJBYmhpc2hlayBLdW1hciIsInVzZXJfdHlwZSI6IkFnZW50In0sImlhdCI6MTcwODM0MzI1NywiZXhwIjoxNzEwOTM1MjU3fQ._BK_GWPpiERd5RMDMJxnw70Z-pP4CaTCHm3UrwEDYRQ";

  const handleEditClick = (bank) => {
    setSelectedBank(bank); // Set the selected bank to display in the popup
    setPopup(true); // Open the popup
  };
  const handleToggle = (params) => (event) => {
    const newStatus = event.target.checked ? "Active" : "Inactive";
    const updatedRowData = rowData.map((row) =>
      row.id === params.row.id ? { ...row, currentStatus: newStatus } : row
    );
    setRowData(updatedRowData);
  };

  const handleAddbankClock = () => {
    setAddBankForm(true);
    if (!formRendered) {
      setFormRendered(true); // Set formRendered to true
    }
  };
  useEffect(() => {
    if (formRendered && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formRendered]);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "AccholderName", headerName: "A/C Holder Name", flex: 1 },
    { field: "accounttype", headerName: "A/C type", flex: 1 },
    { field: "rent", headerName: "Rent", flex: 1 },
    { field: "accountstatus", headerName: "A/C Status", flex: 1 },
    {
      field: "curentstatus",
      headerName: "Current Status",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.currentStatus === "Active"}
          onChange={handleToggle(params)}
          color="primary"
        />
      ),
    },
    { field: "openingbalance", headerName: "Current Balance", flex: 1 },
    { field: "usedof", headerName: "Use For", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    {
      field: "edit",
      headerName: "Edit", // Edit field
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];
  const handleSubmitRequest = async () => {
    try {
      const response = await fetch(`${base_url}bankaccount/add-bank-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Tokens}`,
        },
        body: JSON.stringify({
          bank_name: bankName,
          account_holder_name: accountHolder,
          account_number: accountNumber,
          account_type: accountType,
          rent: rent,
          account_status:accountStatus,
          current_balance: currentStatus,
          opening_balance: openingBalance,
          closing_balance:closingBalance,
          used_for: usedFor,
          opening_date:selectedDate,
          remarks:remarks,
          source_of_fund: Reference,
          // Include other form fields here
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        // Optionally, reset form fields or show success message
      } else {
        const error = await response.text();
        console.error("Error:", error);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other exceptions
    }
    setPopup(false);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };

  const handleDeposit = () => {
    setPopup(true);
  };

  return (
    <Box m="20px">
      <div className="main-class">
        <div className="top-title-deposit">
          <div className="Ibt-trancefer">
            <h1>Add Bank</h1>
            <div className="inttrancefer">
              <form
                className="ibt-form"
                ref={formRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <TextField
                  label="Bank Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  style={{ fontSize: "30px", borderRadius: "25px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />
                <TextField
                  label="Account Holder"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

                <TextField
                  label="Account Number"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Opening Date"
                    value={openingDate}
                    onChange={(date) => setOpeningDate(date)}
                    style={{ fontSize: "30px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Closing Date"
                    value={closingDate}
                    onChange={(date) => setClosingDate(date)}
                    style={{ fontSize: "30px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  />
                </LocalizationProvider>

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    label="Account Type"
                    style={{ fontSize: "20px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  >
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Current">Current</MenuItem>
                    <MenuItem value="MSME">MSME</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <TextField
                  label="Rent"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Account Status</InputLabel>
                  <Select
                    value={accountStatus}
                    onChange={(e) => setAccountStatus(e.target.value)}
                    label="Account Status"
                    style={{ fontSize: "20px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed </MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Current Status</InputLabel>
                  <Select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    label="Current Status"
                    style={{ fontSize: "20px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <TextField
                  label="Opening Balance"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

                <TextField
                  label="Closing Balance"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={closingBalance}
                  onChange={(e) => setClosingBalance(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

                <FormControl fullWidth variant="outlined">
                  <InputLabel>Used For</InputLabel>
                  <Select
                    value={usedFor}
                    onChange={(e) => setUsedFor(e.target.value)}
                    label="Account Status"
                    style={{ fontSize: "20px" }}
                    inputProps={{ style: { fontSize: "20px" } }}
                  >
                    <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                    <MenuItem value="Deposit">Deposit</MenuItem>
                    <MenuItem value="Parking">Parking</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                {/* <TextField
                  label="Used For"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={usedFor}
                  onChange={(e) => setUsedFor(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                /> */}

                <TextField
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

                <TextField
                  label="Reference"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={Reference}
                  onChange={(e) => setReference(e.target.value)}
                  style={{ fontSize: "30px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                />

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
                  <p>Add Bank:</p>
                  <ul>
                    <li>Bank Name: {bankName}</li>
                    <li>Account Holder: {accountHolder}</li>
                    <li>Account Number: {accountNumber}</li>
                    <li>Opening Date: {selectedDate.toLocaleString()}</li>
                    <li>Account Type: {accountType}</li>
                    <li>Account Status: {accountStatus}</li>
                    <li>Rent: {rent}</li>
                    <li>Current Status: {currentStatus}</li>
                    <li>Opening Balance: {openingBalance}</li>
                    <li>Closing Balance: {closingBalance}</li>
                    <li>Used for: {usedFor}</li>
                    <li>Remarks: {remarks}</li>

                    <li>Reference: {Reference}</li>
                    {/* End date display */}
                    {/* Additional details */}
                  </ul>
                  <div className="popup-button">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitRequest}
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
      </div>
    </Box>
  );
}
