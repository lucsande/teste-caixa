import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const SignUpModal = (props) => {
  const [name, setName] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hidden = props.hidden ? "d-none " : ""

  return (
      <div className={`${hidden}modal-background`}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <button className="btn" onClick={() => props.closeModal()}><h5 className="float-right">X</h5></button>
          </Modal.Header>

          <Modal.Body>
            <p className="text-danger">{errorMessage}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control my-1"
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
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
              <hr/>
              <div className="float-right">
                <button type="button" onClick={() => props.closeModal()} className="btn btn-outline-dark m-1">Cancelar</button>
                <button type="submit" className="btn btn-dark m-1">Cadastrar</button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
}

const handleSubmit = async (event) => {
  event.preventDefault();

  try{
    const response = await axios.post(
      "http://localhost:3000/registrations",
      { user: { name: name, security_number: securityNumber } },
      { withCredentials: true }
    );

    if (response.data.error) {
      setErrorMessage('CPF inválido ou já cadastrado')
    } else {
      setErrorMessage('')
    }
  }
  catch (error) {
    console.log(error)
  }
}

export default SignUpModal;
