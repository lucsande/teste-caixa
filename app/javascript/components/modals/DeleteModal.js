import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {
  if (props.modalType !== 'deleteModal') {
    return null
  }
  const [info, setInfo] = useState({
    message: 'Atenção. Essa ação deletará a sua conta permanentemente.',
    textRed: '',
    btnColor: 'btn-dark',
    btnText: 'Deletar conta'
  })

  const handleClick = async () => {
    if (info.textRed === ''){
      setInfo({
        message: 'Seu dinheiro não poderá mais ser retirado a partir de nossos caixas eletrônicos. Tem certeza de que deseja fazer isso?',
        textRed: 'text-danger ',
        btColord: 'btn-warning',
        btnText: 'Sim, delete minha conta'
      })
    } else {
      const response = await axios.delete(
      )
      props.setModalType('none')
    }
  }

  return (
      <div className="modal-background">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Deletar conta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-center">{info.message}</p>
            <p></p>
            <h3 className={`${info.textRed}text-center my-3`}>{props.password}</h3>
            <hr/>
          </Modal.Body>
          <Modal.Footer>
            <div className="float-right">
              <button type="button" onClick={handleClick} className={`btn m-1 ${info.btnColor}`}>{info.btnText}</button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
}


export default DeleteModal;
