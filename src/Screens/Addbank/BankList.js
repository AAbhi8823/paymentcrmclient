import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit"; // Added edit icon
import { base_url } from "../../Utils/Baseurl";
import { auth_token } from "../../Utils/Baseurl";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  ListItemText,
  ListItem,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Download } from "@mui/icons-material";
import { saveAs } from "file-saver";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import * as XLSX from "xlsx";

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const columns = [
  { id: "account_holder_name", label: "Acc Holder Name", minWidth: 170 },
  { id: "source_of_fund", label: "Reference", minWidth: 100 },
  { id: "account_type", label: "Type Of A/C", minWidth: 170, align: "center" },
  { id: "used_for", label: "Used For", minWidth: 170, align: "center" },
  // { id: "starting_date", label: "Starting Date", minWidth: 170, align: "center" },
  {
    id: "current_balance",
    label: "Current Balance",
    minWidth: 170,
    align: "center",
  },
  {
    id: "current_status",
    label: "Current Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "account_status",
    label: "Account Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Edit",
    label: "Edit", // New column for edit button
    minWidth: 100,
    align: "center",
  },
];

export default function BankList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusChecked, setStatusChecked] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const filterRef = useRef(null);
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((column) => column.id)
  );
  const [hideHeader, setHideHeader] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rowsss, setRows] = useState([]);
  const [showFilter, setFilter] = useState(false);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hoursOfDay = Array.from({ length: 24 }, (_, index) => `${index}:00 Hours`);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const handleTimeChange = (event) => {
    setSelectedTimes(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDays(event.target.value);
  };

  useEffect(() => {
    fetch(`${base_url}bankaccount/get-bank-account-list`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRows(data.resData.data);
        console.log("data::>>>>>", data.resData.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleStatusClick = () => {
    console.log("handleStatusClick");
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusToggle = () => {
    setStatusChecked((prev) => !prev);
  };

  const handleDownload = () => {
    const sheetData = [
      columns.map((column) => column.label), // Header row
      ...rowsss.map((row) => selectedColumns.map((column) => row[column])),
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    // Convert workbook to an array buffer
    const wbArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert array buffer to blob
    const blob = new Blob([wbArrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save blob as a file
    saveAs(blob, "table_data.xlsx");
  };

  const handleColumnToggle = (event) => {
    const selectedColumns = event.target.value;
    setSelectedColumns(selectedColumns);
    // Update hideHeader state based on whether any column is selected
    setHideHeader(selectedColumns.length === 0);
  };

  const handleFilterByDate = () => {
    // Filter rows based on the selected date range, times, days, and search query
    const filteredRows = rowsss.filter((row) => {
      const rowDate = new Date(row.StartingDate);
      const matchesSearchQuery =
        (row.account_holder_name &&
          row.account_holder_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (row.Reference &&
          row.Reference.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (row.account_type &&
          row.account_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (row.current_balance &&
          row.current_balance.toString().includes(searchQuery)) ||
        (row.current_status &&
          row.current_status
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (row.account_status &&
          row.account_status.toLowerCase().includes(searchQuery.toLowerCase()));

      // Check if the row's date is within the selected date range
      const isWithinDateRange =
        (!startDate || rowDate >= startDate) &&
        (!endDate || rowDate <= endDate);

      // Check if the row's time matches any of the selected times
      const isMatchingTime =
        selectedTimes.length === 0 ||
        selectedTimes.some((time) => {
          const [hour] = time.split(":");
          return rowDate.getHours() === parseInt(hour, 10);
        });

      // Check if the row's day matches any of the selected days
      const isMatchingDay =
        selectedDays.length === 0 ||
        selectedDays.includes(daysOfWeek[rowDate.getDay()]);

      return (
        isWithinDateRange &&
        isMatchingTime &&
        isMatchingDay &&
        matchesSearchQuery
      );
    });

    return filteredRows;
  };

  const handleFilter = () => {
    setFilter(!showFilter);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      // Click occurred outside of the filter popup
      setFilter(false); // Close the popup
    }
  };

  useEffect(() => {
    if (showFilter) {
      // Add event listener when the popup is shown
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the popup is hidden
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const sortedRows = stableSort(
    handleFilterByDate(),
    getComparator(order, orderBy)
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
            style={{
              margin: "50px 10px 30px",
              width: "300px",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleFilter}
            style={{
              margin: "50px 10px 30px",
              width: "200px",
              background: "none",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
          >
            Coustom
          </button>
          <FormControl
            style={{
              margin: "50px 10px 30px",
              width: "200px",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
          >
            <InputLabel id="columns-label" style={{position:'relative'}}>
             {selectedColumns.length < 0 ? "Show/Hide Columns" : ""}
            </InputLabel>
            <p style={{position:'absolute',left:'10px'}}>Show/Hide Columns</p>
            <Select
              placeholder="Show"
              labelId="columns-label"
              id="columns"
              multiple
              value={selectedColumns}
              onChange={handleColumnToggle}
              renderValue={(selected) => ""}
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  <Checkbox checked={selectedColumns.includes(column.id)} />
                  <ListItemText primary={column.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Download />}
            style={{
              margin: "50px 10px 30px",
              width: "150px",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
      <div
        className="tableelement"
        style={{
          display: "flex",
          width: "95%",
          marginLeft: "3%",
          boxShadow: "0px 0px 5px gray",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            {!hideHeader && (
              <TableHead>
                <TableRow>
                  {selectedColumns.map((columnId) => {
                    const column = columns.find((col) => col.id === columnId);
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontSize: "15px",
                          fontWeight: "bold",
                          position: "relative",
                        }}
                        onClick={() => handleRequestSort(column.id)}
                        colSpan={1}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          order === "desc" ? (
                            <ArrowDownwardIcon
                              fontSize="small"
                              style={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            />
                          ) : (
                            <ArrowUpwardIcon
                              fontSize="small"
                              style={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            />
                          )
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {selectedColumns.map((columnId) => {
                        const column = columns.find(
                          (col) => col.id === columnId
                        );
                        const value = row[columnId];
                        return (
                          <TableCell
                            key={columnId}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontSize: "15px",
                            }}
                          >
                            {columnId === "current_status" ? (
                              <Button onClick={() => handleStatusClick(row)}>
                                {value}
                                {console.log("CurrentStatus:::>>>>", value)}
                              </Button>
                            ) : column.id === "Edit" ? (
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          display: "flex",
          width: "95%",
          marginLeft: "3%",
          boxShadow: "0px 0px 5px gray",
        }}
      />
      {showFilter && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background overlay
            zIndex: 99, // Ensure the popup is on top of other content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              background: "#fff",
              boxShadow: "0px 0px 15px gray",
              padding: "20px 30px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "colom",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h2>Custom Date & Time</h2>
              <ClearOutlinedIcon
                onClick={() => {
                  setFilter(false);
                }}
              />
            </div>
            {/* Filter popup content */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  marginRight: "10px",
                  marginBottom: "30px",
                  justifyContent: "space-between",
                }}
              >
                <DatePicker
                  style={{ marginLeft: "10px", width: "200px" }}
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  style={{ width: "200px", marginLeft: "10px" }}
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
            <div style={{ display: "flex" }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Daily Times</InputLabel>
                <Select
                  multiple
                  value={selectedTimes}
                  onChange={handleTimeChange}
                  label="Daily Times"
                  style={{ fontSize: "20px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 150,
                      },
                    },
                  }}
                >
                  {hoursOfDay.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      <Checkbox checked={selectedTimes.indexOf(hour) > -1} />
                      <ListItemText primary={hour} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Day Selection</InputLabel>
                <Select
                  multiple
                  value={selectedDays}
                  onChange={handleDayChange}
                  label="Day Selection"
                  style={{ fontSize: "20px" }}
                  inputProps={{ style: { fontSize: "20px" } }}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 150,
                      },
                    },
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={selectedDays.indexOf(day) > -1} />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
}
