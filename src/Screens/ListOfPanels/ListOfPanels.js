import React, { useState } from "react";
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
  { id: "PanelName", label: "Panel Name", minWidth: 170, align: "center" },
  {
    id: "CurrentBalance",
    label: "Current balance",
    minWidth: 100,
    align: "center",
  },
];

function createData(PanelName, CurrentBalance) {
  return {
    PanelName,
    CurrentBalance,
  };
}

const rows = [
  createData("Panel Name", "100"),
  createData("Panel Name", "1200"),
  createData("Panel Name", "100"),
  createData("Panel Name", "1780"), createData("Panel Name", "1567600"),
  createData("Panel Name", "1200"),
  createData("Panel Name", "1900"),
  createData("Panel Name", "178200"), createData("Panel Name", "15600"),
  createData("Panel Name", "126600"),
  createData("Panel Name", "106660"),
  createData("Panel Name", "1777200"),
  createData("Panel Name", "10670"),
  createData("Panel Name", "876677"),


];

export const ListOfPanels = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusChecked, setStatusChecked] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [selectedColumns, setSelectedColumns] = useState(columns.map((column) => column.id));
  const [hideHeader, setHideHeader] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
      ...rows.map((row) => selectedColumns.map((column) => row[column])),
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
    // Filter rows based on the selected date range and search query
    const filteredRows = rows.filter((row) => {
      const rowDate = new Date(row.Date); // Change this to row.StartingDate
      const matchesSearchQuery =
        row.PanelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.CurrentBalance.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        (!startDate || rowDate >= startDate) &&
        (!endDate || rowDate <= endDate) &&
        (searchQuery.trim() === "" || matchesSearchQuery)
      );
    });
    return filteredRows;
  };

  const sortedRows = stableSort(
    handleFilterByDate(),
    getComparator(order, orderBy)
  );

  return (
    <div
      style={{
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "2%",
        marginTop: "5%",
      }}
    >
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
              style={{ margin: "50px 10px 30px", width: "300px" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl style={{ margin: "50px 10px 30px", width: "200px" }}>
            <InputLabel id="columns-label" style={{position:'relative'}}>
             {selectedColumns.length < 0 ? "Show/Hide Columns" : ""}
            </InputLabel>
            <p style={{position:'absolute',left:'10px'}}>Show/Hide Columns</p>
              <Select
                placeholder=""
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
              style={{ margin: "50px 10px 30px", width: "150px" }}
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        </div>

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
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "relative",
                          textTransform: "uppercase",
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
                            {columnId === "CurrentStatus" ? (
                              <IconButton onClick={handleStatusToggle}>
                                {statusChecked ? (
                                  <CheckCircleOutline />
                                ) : (
                                  <RadioButtonUnchecked />
                                )}
                              </IconButton>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sortedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
