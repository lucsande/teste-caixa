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
  const transactionType = props.modalType === "withdrawalModal"? "withdrawal" : "deposit"

  const handleSubmit = async () => {
    event.preventDefault();
    if (transactionType === "withdrawal" && props.user.balance - amount < 0) {
      return setErrorMessage("Valor do saque é superior ao saldo disponível")
    }

    try{
      const response = await axios.patch(
        modalInfos.submitURL,
        {
          amount: parseFloat(amount.replace(",", ".")),
          transactionType: transactionType,
          payer: { security_number: securityNumber, password: password },
          receiver: { security_number: securityNumber, password: password }
        },
        { withCredentials: true }
      );
      if (response.data.error) {
        setErrorMessage(modalInfos.error)
      } else {
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

          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <p>Saldo disponível: R${Number(props.user.balance).toFixed(2)}</p>
              <p className="text-danger">{errorMessage}</p>
                <div className="form-group">
                  <input
                    className="form-control my-1"
                    type="text"
                    name="valor"
                    placeholder="valor da operação"
                    value={amount}
                    onChange={(event) => setAmount(parseFloat(event.target.value))}
                    required
                  />
                </div>
                <p>Favor confirmar as suas credenciais</p>
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


export default WithdrawalDepositModal;
