
import "./index.css"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KadenaKodeLogo } from "../../assets"
import { disconnectProvider } from "../../kda-wallet/store/kadenaSlice"
import { showConnectWalletModal } from "../../kda-wallet/store/connectWalletModalSlice"
import reduceToken from "../../kda-wallet/utils/reduceToken"
import CustomButton from "../layout/CustomButton"
import FlexRow from "../layout/FlexRow"
import useTheme from "../../hooks/useTheme"

function Navbar() {
  const { theme, changeTheme } = useTheme()

  const account = useSelector((state) => state.kadenaInfo.account)
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(showConnectWalletModal())
  }

  const disconnect = () => {
    dispatch(disconnectProvider())
  }

  const toggleTheme = () => {
    if(theme === "light"){
      changeTheme("dark");
    }else{
      changeTheme("light");
    }
  }

  return (
    <nav className="w-full flex flex-row justify-between items-center p-2 text-xl my-5">
      <div className="flex items-center justify-center gap-5 w-42">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" id="toggleB" className="sr-only" checked = {theme === "light"} onChange={()=>toggleTheme()} />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
          </div>          
        </label>
      </div>
      <div className={`text-3xl sm:text-6xl font-bold text-center md:text-6xl ${theme==='dark'?"text-white":""}`}>Kadena Coin Flip</div>
      <FlexRow className="gap-2">
        <CustomButton
          className="flex-1 sm:flex-none bg-pink"
          text={account === "" ? "Connect Wallet" : "Disconnect"}
          onClick={account === "" ? openModal : disconnect}
        />
        <div  className={` absolute right-16 top-24 text-14 text-right py-2 ${theme==='dark'?"text-white":""}`}>{reduceToken(account)}<br />
        {account!==""?"Must be on chain 8":""}</div>
      </FlexRow>
    </nav>
  )
}

export default Navbar
