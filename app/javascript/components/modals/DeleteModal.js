import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import url from "./url"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {
  if (props.modalType !== 'deleteModal') {
    return null
  }
  const [securityNumber, setSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState({
    message: 'Atenção. Essa ação deletará a sua conta permanentemente.',
    error: '',
    textRed: '',
    btnVisibility: '',
    formVisibility: 'd-none'
  })

  const handleClick = async () => {
    setInfo({
      message: 'Seu dinheiro não poderá mais ser retirado a partir de nossos caixas eletrônicos. Tem certeza de que deseja fazer isso?',
      error: '',
      textRed: 'text-danger ',
      btnVisibility: 'd-none',
      formVisibility: ''
    })
  }

  const handleSubmit = async () => {
    event.preventDefault();
    try{
      const response = await axios.delete(
        `${url()}/users`,
        { data:
          { user: { security_number: securityNumber, password: password } }
        },
        { withCredentials: true }
      )

      if (response.data.error) {
        setInfo({...info, error: "Credenciais incorretas, favor verificar"})
      } else {
        const logoutRes = await axios.delete(`${url()}/logout`, {withCredentials: true})

        console.log(logoutRes)
        props.setIsLoggedIn(!logoutRes.data.logged_out)
        props.setModalType("none")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="modal-background">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Deletar conta</Modal.Title>
            <button className="btn" onClick={() => props.setModalType('none')}><h5 className="float-right">X</h5></button>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <p className={`text-center ${info.textRed}`}>{info.message}</p>
              <hr/>
              <div className={`${info.formVisibility}`}>
                <p>Favor confirmar as suas credenciais</p>
                <p className="text-danger">{info.error}</p>
                <div className="form-group">
                  <input
                    className="form-control my-1"
                    type="text"
                    name="security-number"
                    placeholder="Favor confirmar seu CPF"
                    value={securityNumber}
                    onChange={(event) => setSecurityNumber(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className={`form-control my-1`}
                    type="password"
                    name="password"
                    placeholder="Favor confirmar sua senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="float-right">
                <button type="button" onClick={() => props.setModalType('none')} className="btn btn-outline-dark m-1">Cancelar</button>
                <button type="button" onClick={handleClick} className={`btn m-1 btn-dark ${info.btnVisibility}`}>Deletar conta</button>
                <button type="submit" className={`btn m-1 btn-danger ${info.formVisibility}`}>Sim, delete minha conta</button>
              </div>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
}


export default DeleteModal;
