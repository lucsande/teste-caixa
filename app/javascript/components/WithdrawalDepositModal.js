import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setModalInfos from './setModalInfos'

const WithdrawalDepositModal = (props) => {
  if (props.modalType !== 'withdrawalModal' && props.modalType !== 'depositModal') {
    return null
  }

  const [securityNumber, setSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalInfos = setModalInfos(props.modalType);
  const isWithdrawal = props.modalType === "withdrawalModal"

  const handleSubmit = async () => {
    event.preventDefault();
    if (props.user.balance + amount < 0) {
      return setErrorMessage("Valor do saque superior ao disponível")
    }

    try{
      const response = await axios.patch(
        modalInfos.submitURL,
        { amount: amount, withdrawal: isWithdrawal, user: { security_number: securityNumber, password: password } },
        { withCredentials: true }
      );
      if (response.data.error) {
        setErrorMessage(modalInfos.error)
      } else {
        console.log(amount)
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
            <Modal.Title>{modalInfos.title}</Modal.Title>
            <button className="btn" onClick={() => props.setModalType('none')}><h5 className="float-right">X</h5></button>
          </Modal.Header>

          <Modal.Body>
            <p>Saldo disponível: R${Number(props.user.balance).toFixed(2)}</p>
            <p className="text-danger">{errorMessage}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control my-1"
                  type="text"
                  name="security-number"
                  placeholder="valor"
                  value={amount}
                  onChange={(event) => setAmount(parseFloat(event.target.value.replace(",", ".")))}
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
              <div className="form-group">
                <input
                  className={`${modalInfos.passwordInputClass}form-control my-1`}
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <hr/>
              <div className="float-right">
                <button type="button" onClick={() => props.setModalType('none')} className="btn btn-outline-dark m-1">Cancelar</button>
                <button type="submit" className="btn btn-dark m-1">{modalInfos.submitText}</button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
}


export default WithdrawalDepositModal;
