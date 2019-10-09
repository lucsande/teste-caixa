import React from 'react'
import { useState } from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-light bg-dark d-flex justify-content-between">
      <span className="navbar-brand mb-0 text-white"><i className="fi-xnsuxl-lock-solid"></i>SeuCaixa</span>
      {createButtons(props)}
    </nav>
  );
}

const createButtons = (props) => {
  if (props.isLoggedIn) {
    return (
      <div>
        <button className="btn btn-outline-light mx-1">Sair</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => props.setModalType('signUpModal')} className="btn btn-outline-light mx-1">
        Cadastro
      </button>
      <button className="btn btn-outline-light mx-1">Entrar</button>
    </div>
  )
}

export default Navbar;
