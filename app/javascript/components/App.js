import React from 'react';
// import PropTypes from "prop-types"
import { useState, useEffect } from 'react';
import axios from 'axios';
import url from "./modals/url"
import Navbar from './Navbar';
import MainScreen from './MainScreen';
import AuthenticationModal from './modals/AuthenticationModal';
import PassInfoModal from './modals/PassInfoModal';
import WithdrawalDepositModal from './modals/WithdrawalDepositModal';
import TransferModal from './modals/TransferModal';
import StatementModal from './modals/StatementModal';

const App = () => {
  const [user, setUser] = useState({})
  const [password, setPassword] = useState("");
  const [modalType, setModalType] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    axios.get(`${url()}/logged_in`, {withCredentials: true})
      .then((response) => {
        setIsLoggedIn(response.data.logged_in)
        setUser(response.data.user)
      })
  }, [modalType])

  return ([
    <Navbar key='1' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setModalType={setModalType} />,
    <MainScreen key='2' user={user} modalType={modalType} setModalType={setModalType}
      isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setTransactions={setTransactions}
    />,
    <AuthenticationModal key='3' user={user} modalType={modalType} setModalType={setModalType} setPassword={setPassword} />,
    <PassInfoModal key='4' password={password} setPassword={setPassword} modalType={modalType} setModalType={setModalType} />,
    <WithdrawalDepositModal key='5' user={user} modalType={modalType} setModalType={setModalType} />,
    <TransferModal key='6' user={user} modalType={modalType} setModalType={setModalType} />,
    <StatementModal key='7' user={user} modalType={modalType} setModalType={setModalType} transactions={transactions} />
  ]);
}

export default App;
