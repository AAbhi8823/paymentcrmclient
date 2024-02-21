import React, { useState } from "react";
import Header from "../../Component/Header";
import { Box } from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function Summary() {
  return (
    <Box m="20px">
      <div className="top-title-deposit">
      <Header title="Summary" subtitle="Welcome to Summary" />
      </div>
    </Box>
  )
}


