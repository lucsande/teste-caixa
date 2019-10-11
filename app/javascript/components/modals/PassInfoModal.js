import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const APassInfoodal = (props) => {
  if (props.modalType !== 'passInfoModal') {
    return null
  }
  const [info, setInfo] = useState({
    message: 'Geramos uma nova senha para você. Por favor, anote-a e não a compartilhe com ninguém, ela garante acesso à sua conta nos caixas da rede SeuCaixa',
    textRed: '',
    btnText: 'Anotei minha senha'
  })

  const handleClick = () => {
    if (info.textRed === ''){
      setInfo({
        message: 'Por favor verifique a senha que anotou, sem ela você não conseguirá acessar mais sua conta.',
        textRed: 'text-danger ',
        btnText: 'Verifiquei minha senha'
      })
    } else {
      props.setPassword("")
      props.setModalType('none')
    }
  }

  return (
      <div className="modal-background">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Importante: Senha</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-center">{info.message}</p>
            <p></p>
            <h3 className={`${info.textRed}text-center my-3`}>{props.password}</h3>
            <hr/>
          </Modal.Body>
          <Modal.Footer>
            <div className="float-right">
              <button type="button" onClick={handleClick} className="btn btn-dark m-1">{info.btnText}</button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
}


export default PassInfoModal;
