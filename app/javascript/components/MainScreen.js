import React from 'react'
import BalanceDisplay from './BalanceDisplay';
import ActionsList from './ActionsList';

const MainScreen = (props) => {
  const handleLogout = () => {
    axios.delete(`${url()}/logout`, {withCredentials: true})
      .then((response) => {
        props.setIsLoggedIn(!response.data.logged_out)
      })
  }

  if (!props.isLoggedIn) {
    return (
      <div id="logged-out-screen">
      <div>
        <span id="logo-big"><i className="fi-xnsuxl-lock-solid"></i>SeuCaixa</span>
        <h4 className="text-right">O seu dinheiro onde e quando quiser</h4>
        <div className="d-flex flex-row justify-content-end">
          <button onClick={() => props.setModalType('signUpModal')} className="btn btn-dark mx-1">
            Cadastro
          </button>
          <button onClick={() => props.setModalType('loginModal')} className="btn btn-dark mx-1">Entrar</button>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className="m-5">
      <h3>Olá, {props.user.name}.</h3>
      <div className="d-flex justify-content-around" id="main-screen">
        <BalanceDisplay user={props.user} />
        <ActionsList user={props.user} setUser={props.setUser} modalType={props.modalType} setModalType={props.setModalType} />
      </div>
    </div>
  )
}

export default MainScreen
