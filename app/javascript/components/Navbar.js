import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-light bg-dark d-flex justify-content-between">
      <span className="navbar-brand mb-0 text-white"><i className="fi-xnsuxl-lock-solid"></i>SeuCaixa</span>
      {createButtons(props)}
    </nav>
  );
}

const createButtons = (props) => {
  const handleLogout = () => {
    axios.delete('http://localhost:3000/logout')
      .then((response) => {
        props.setIsLoggedIn(!response.data.logged_out)
      })
  }

  if (props.isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout} className="btn btn-outline-light mx-1">Sair</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => props.setModalType('signUpModal')} className="btn btn-outline-light mx-1">
        Cadastro
      </button>
      <button onClick={() => props.setModalType('loginModal')} className="btn btn-outline-light mx-1">Entrar</button>
    </div>
  )
}

export default Navbar;
