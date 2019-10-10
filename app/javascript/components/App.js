import React from 'react';
// import PropTypes from "prop-types"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AuthenticationModal from './AuthenticationModal';
import PassInfoModal from './PassInfoModal';

const App = () => {
  console.log(process.env)
  const [userInfo, setUserInfo] = useState({
    user: {},
    passwordInfo: ""
  });
  const [modalType, setModalType] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
      .then((response) => {
        setIsLoggedIn(response.data.logged_in)
        setUserInfo({...userInfo, user: response.data.user})
      })
  }, [modalType])

  return ([
    <Navbar key='1' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setModalType={setModalType} />,
    <AuthenticationModal key='2' userInfo={userInfo} setUserInfo={setUserInfo} modalType={modalType} setModalType={setModalType} />,
    <PassInfoModal key='3' userInfo={userInfo} setUserInfo={setUserInfo} modalType={modalType} setModalType={setModalType} />
  ]);
}

export default App;
