import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TransferWithinAStationOutlinedIcon from "@mui/icons-material/TransferWithinAStationOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UserImage from "../../Assets/user.jpg";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor: selected === title ? "#ccccccff" : "transparent",
      }}
      icon={icon}
      component={<NavLink to={to} style={{ textDecoration: "none" }} />}
    >
      <Typography onClick={() => setSelected(title)}>{title}</Typography>
    </MenuItem>
  );
};

export default function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Box>
      <Sidebar>
        <Menu iconShape="square">
          <MenuItem
            // onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0 20px 0",
              color: "#b4b9bfff",
            }}
          >
            <Typography
              variant="h3"
              color={colors.primary[100]}
              style={{ textAlign: "center", textTransform: " uppercase" }}
            >
              team leader
            </Typography>
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashBoard"
              icon={<HomeOutlinedIcon style={{ fontSize: "35px" }} />}
              selected={selected}
              setSelected={setSelected}
              style={{ fontSize: "20px" }}
            />
            <SubMenu
              label="Bank"
              icon={<AddBusinessOutlinedIcon />}
              id="form-inputtttt"
            >
              <div style={{ backgroundColor: "#ccccccff", paddingLeft: "8px" }}>
                <MenuItem
                  icon={<TimelineRoundedIcon />}
                  onClick={() => {
                    navigate("/BankList");
                  }}
                  style={{ marginTop: "8px" }}
                >
                  List of Banks
                </MenuItem>
                <MenuItem
                  icon={<BubbleChartRoundedIcon />}
                  onClick={() => {
                    navigate("/Addbank");
                  }}
                  style={{ marginTop: "8px" }}
                >
                  Add Bank
                </MenuItem>
                <MenuItem
                  icon={<BubbleChartRoundedIcon />}
                  onClick={() => {
                    navigate("/AddTransaction");
                  }}
                  style={{ marginTop: "8px" }}
                >
                  Add Transaction
                </MenuItem>
                <MenuItem
                  icon={<BubbleChartRoundedIcon />}
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ marginTop: "8px" }}
                >
                  Statements
                </MenuItem>
              </div>
            </SubMenu>
            <SubMenu
              label="Panels"
              icon={<AddBusinessOutlinedIcon />}
              id="form-inputtttt"
            >
              <MenuItem
                icon={<TimelineRoundedIcon />}
                onClick={() => {
                  navigate("/ListOfPanels");
                }}
              >
                List Of Panels
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/AddPanal");
                }}
              >
                Add Panel
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/Addbank");
                }}
              >
                List of IDS
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/CreatId");
                }}
              >
                Create ID
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/Statements");
                }}
              >
                Statements
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/Addbank");
                }}
              >
                Add Transaction
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Agents"
              icon={<AddBusinessOutlinedIcon />}
              id="form-inputtttt"
            >
              <MenuItem
                icon={<TimelineRoundedIcon />}
                onClick={() => {
                  navigate("/Addbank");
                }}
              >
                List Of Agents
              </MenuItem>
              <MenuItem
                icon={<BubbleChartRoundedIcon />}
                onClick={() => {
                  navigate("/AddAgent");
                }}
              >
                Add Agent
              </MenuItem>
            </SubMenu>
            {/* <Item
              title="WithDrawl"
              to="/WithDrawl"
              icon={<TransferWithinAStationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              id="form-inputtttt"
            />
            <Item
              title="CreatID"
              to="/CreatID"
              icon={<AddBoxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              id="form-inputtttt"
            />
            <Item
              title="Deposit"
              to="/Deposit"
              icon={<AddCardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              id="form-inputtttt"
            />
            <Item
              title="IBT"
              to="/Ibt"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Summary"
              to="/Summary"
              icon={<FunctionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}

            />
            <Item
              title="Transaction"
              to="/Transaction"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}
