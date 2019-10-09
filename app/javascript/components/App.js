import React from 'react';
// import PropTypes from "prop-types"
import { useState } from 'react';
import Navbar from './Navbar';
import SignUpModal from './SignUpModal';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [modalType, setModalType] = useState("none");

  const closeModal = () => {
    setModalType('none')
  }

  return ([
    <Navbar key='1' isLoggedIn={isLoggedIn} setModalType={setModalType} />,
    <SignUpModal key='2' hidden={modalType !== "signUpModal"} closeModal={closeModal} />
  ]);
}

export default App;
