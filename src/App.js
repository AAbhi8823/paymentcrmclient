
import { ColorModeContext,useMode } from "./theme";
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from './Screens/Global/TopBar'
import SideBar from './Screens/Global/SideBar'
import DashBoard from './Screens/Dashbord/index.jsx';
import CreatID from './Screens/CreatID/index.jsx';
import Deposit from './Screens/Deposit/index.jsx';
import Summary from './Screens/Summery/index.jsx';
import WithDrawl from './Screens/Withdrawl/index';
import {Routes,Route} from 'react-router-dom'
import IBTpage from "./Screens/IBT";
import Transaction from "./Screens/Transaction";
import Addbank from './Screens/Addbank/index';
import BankList from './Screens/Addbank/BankList.js'
import { AddPanal } from "./Screens/AddPanal/AddPanal.js";
import { ListOfPanels } from "./Screens/ListOfPanels/ListOfPanels.js";
import { AddAgent } from "./Screens/AddAgent/AddAgent.js";
import AddTransaction from "./Screens/AddTransaction/AddTransaction.js";
import { Statements } from "./Screens/Statements/Statements.js";
function App() {
  const[theme,colorMode]=useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="app">
    <SideBar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar}/>
        <Routes>
          <Route path='/dashBoard'  element={<DashBoard/>}/>
          <Route path='/CreatID'  element={<CreatID/>}/>
          <Route path='/Deposit'  element={<Deposit/>}/>
          <Route path='/Summary'  element={<Summary/>}/>
          <Route path='/WithDrawl'  element={<WithDrawl/>}/>
          <Route path='/Transaction' element={<Transaction/>}/>
          <Route path='/BankList' element={<BankList/>}/>
          <Route path='/Ibt' element={<IBTpage/>}></Route>
          <Route path='/Addbank' element={<Addbank/>}></Route>
          <Route path='/ListOfPanels' element={<ListOfPanels/>}></Route>
          <Route path='/AddPanal' element={<AddPanal/>}></Route>
          <Route path='/AddAgent' element={<AddAgent/>}></Route>
          <Route path='/AddTransaction' element={<AddTransaction/>}></Route>
          <Route path='/Statements' element={<Statements/>}></Route>

        </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
