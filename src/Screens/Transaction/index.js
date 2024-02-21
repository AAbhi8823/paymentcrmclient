import React, { useState } from "react";
import Header from "../../Component/Header";
import { Box } from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mockDataTeam } from "../../Data/Mockdata";
import { DataGrid,GridToolbar} from "@mui/x-data-grid";
import "./Transaction.css";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
export default function Transaction() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "senderAccount",
        headerName: "SenderAccount",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "receiverAccount",
        headerName: "ReceiverAccount",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "ifcCode",
        headerName: "IFCCode",
        type: "Text",
        headerAlign: "left",
        align: "left",
      },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <ManOutlinedIcon />}
            {access === "user" && <Person4OutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
   
  ];
  return (
    <Box m="20px">
      <div className="top-title-deposit">
        <Box
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={mockDataTeam} columns={columns}
            initialState={{
          ...mockDataTeam.initialState,
          pagination: { paginationModel: { pageSize: 7 } },
        }}
        pageSizeOptions={[7, 20, 25]}
        components={{ Toolbar: GridToolbar }}
           
           
           />
        </Box>
      </div>
    </Box>
  );
}
