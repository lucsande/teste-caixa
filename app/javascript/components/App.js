import React from 'react';
// import PropTypes from "prop-types"
import { useState, useEffect } from 'react';
import axios from 'axios';
import url from "./url"
import Navbar from './Navbar';
import AuthenticationModal from './AuthenticationModal';
import PassInfoModal from './PassInfoModal';
import MainScreen from './MainScreen';
import WithdrawalDepositModal from './WithdrawalDepositModal';
import TransferModal from './TransferModal';

const App = () => {
  const [user, setUser] = useState({})
  const [password, setPassword] = useState("");
  const [modalType, setModalType] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`${url()}/logged_in`, {withCredentials: true})
      .then((response) => {
        setIsLoggedIn(response.data.logged_in)
        setUser(response.data.user)
        // console.log(response.data.user)
        // console.log(user)
        // console.log("-------------")
      })
  }, [modalType])

  return ([
    <Navbar key='1' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setModalType={setModalType} />,
    <MainScreen key='2' user={user} modalType={modalType} setModalType={setModalType} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    <AuthenticationModal key='3' user={user} modalType={modalType} setModalType={setModalType} setPassword={setPassword} />,
    <PassInfoModal key='4' password={password} setPassword={setPassword} modalType={modalType} setModalType={setModalType} />,
    <WithdrawalDepositModal key='6' user={user} modalType={modalType} setModalType={setModalType} />,
    <TransferModal key='5' user={user} modalType={modalType} setModalType={setModalType} />
  ]);
}

export default App;
