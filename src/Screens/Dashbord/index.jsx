import React, { useState } from 'react'
import {Box} from "@mui/material"
import Header from '../../Component/Header'
import './Dashboard.css'
import Images from '../../Image/Image'
import WithImage from '../../Image/cashwithdrawal.png'
import Deposit from '../../Image/deposit.png'
import Profile from '../../Image/investment.png'
import Risk from '../../Image/risk.png'
export default function Dashbord() {
  const [attendence,setAttendence]=useState()
  const [Overview,setOverview]=useState(false)
  return (
    <Box m="20px">
      <Header title="Welcome Back, Ankur" subtitle='Welcome to dashbord'></Header>
      <div className='dashbord-mainclass'>
        <div className='dashbord-leftclass'>
          <div className='titlecard'>
            <div className='colection-card'>
              <p>Withdrawal</p>
              <img src={WithImage} height={'50px'} />
              </div>
            <div className='colection-card'><p>Deposit</p> 
            <img src={Deposit} height={'50px'} />
            </div>
            <div className='colection-card'>
              <p>Profit</p>
            <img src={Profile} height={'50px'} />
            </div>
            <div className='colection-card'>
              <p>Loss</p>
            <img src={Risk} height={'50px'} />
            </div>

          </div>
        </div>
        <div className='dashbord-rightclass'> 
        <div className='user-info'>
          <div className='attendence-button'>
            <button onClick={()=>{}}>Mark Attendance</button>
            <button onClick={()=>{}}>Attendance Overview</button>
          </div>
        </div>
        </div>
      </div>
    </Box>
  )
}
