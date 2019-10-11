import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setModalInfos from './setModalInfos'

const AuthenticationModal = (props) => {
  if (props.modalType !== 'signUpModal' && props.modalType !== 'loginModal') {
    return null
  }

  const [name, setName] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalInfos = setModalInfos(props.modalType);

  const handleSubmit = async () => {
    event.preventDefault();
    try{
      const response = await axios.post(
        modalInfos.submitURL,
        { user: { name: name, security_number: securityNumber, password: password } },
        { withCredentials: true }
      );
      if (response.data.error) {
        setErrorMessage(modalInfos.error)
      } else if (props.modalType === 'loginModal') {
        props.setModalType("none")
      } else {
        setErrorMessage('')
        props.setPassword(response.data.generated_password)
        props.setModalType("passInfoModal")
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
            <Modal.Title>{modalInfos.title}</Modal.Title>
            <button className="btn" onClick={() => props.setModalType('none')}><h5 className="float-right">X</h5></button>
          </Modal.Header>

          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <p className="text-danger">{errorMessage}</p>
                <div className="form-group">
                  <input
                    className={`${modalInfos.nameInputClass}form-control my-1`}
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required={modalInfos.nameRequirement}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control my-1"
                    type="text"
                    name="security-number"
                    placeholder="CPF"
                    value={securityNumber}
                    onChange={(event) => setSecurityNumber(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className={`${modalInfos.passwordInputClass}form-control my-1`}
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required={modalInfos.passwordRequirement}
                  />
                </div>
              <hr/>
              <div className="float-right">
                <button type="button" onClick={() => props.setModalType('none')} className="btn btn-outline-dark m-1">Cancelar</button>
                <button type="submit" className="btn btn-dark m-1">{modalInfos.submitText}</button>
              </div>
            </Modal.Body>
          </form>
        </Modal.Dialog>
      </div>
    );
}


export default AuthenticationModal;
