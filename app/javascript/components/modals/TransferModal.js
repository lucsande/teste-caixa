import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import url from "./url"

const WithdrawalDepositModal = (props) => {
  if (props.modalType !== "transferModal") {
    return null
  }

  const [amount, setAmount] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [receiverName, setReceiverName] = useState("procurando...");
  const [receiverNameClass, setReceiverNameClass] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchReceiver = async (value) => {
    setReceiverNumber(value)
    const response = await axios.post(
      `${url()}/users/find`,
      { security_number: value},
      { withCredentials: true }
    );
    if (response.data.error) {
      setReceiverName("procurando...")
      setReceiverNameClass("");
    } else {
      setReceiverName(response.data.user.name);
      setReceiverNameClass("text-dark h4");
    }
  }

  const handleSubmit = async () => {
    event.preventDefault();
    if (receiverName === "Procurando beneficiado...") {
      return setErrorMessage("CPF do beneficiado não encontrado, favor verificar os dados.")
    }
    if (props.user.balance - amount < 0) {
      return setErrorMessage("Valor da transferência é superior ao saldo disponível")
    }

    try{
      const response = await axios.patch(
        `${url()}/users`,
        {
          amount: parseFloat(amount.replace(",", ".")),
          transactionType: "transfer",
          payer: { security_number: securityNumber, password: password },
          receiver: { security_number: receiverNumber }
        },
        { withCredentials: true }
      );
      if (response.data.error) {
        setErrorMessage("Credenciais incorretas")
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
            <Modal.Title>Transferência</Modal.Title>
            <button className="btn" onClick={() => props.setModalType('none')}><h5 className="float-right">X</h5></button>
          </Modal.Header>

          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <p>Saldo disponível: R${Number(props.user.balance).toFixed(2)}</p>
              <p className="text-secondary">Beneficiado: <span className={`${receiverNameClass}`}>{receiverName}</span></p>
              <p className="text-danger">{errorMessage}</p>
                <div className="scrollable">
                  <div className="form-group">
                      <input
                        className="form-control my-1"
                        type="text"
                        name="receiver"
                        placeholder="CPF do beneficiado"
                        onChange={() => searchReceiver(event.target.value)}
                        required
                      />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control my-1"
                      type="text"
                      name="security-number"
                      placeholder="valor da transferência"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      required
                    />
                  </div>
                  <hr/>
                  <p>Favor confirmar os seus dados</p>
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
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <div className="float-right">
                  <button type="button" onClick={() => props.setModalType('none')} className="btn btn-outline-dark m-1">Cancelar</button>
                  <button type="submit" className="btn btn-dark m-1">Fazer transferência</button>
                </div>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </div>
    );
}


export default WithdrawalDepositModal;
