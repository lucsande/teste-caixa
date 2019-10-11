import React from 'react'
import { useState } from 'react';
import axios from "axios";
import url from "./url"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import TransactionsList from "./TransactionsList"


const StatementModal = (props) => {
  if (props.modalType !== 'statementModal') {
    return null
  }

  const listTransactions = () => {
    return (
      <React.Fragment>
        {props.transactions.map(transaction => (
          <tr>
            <td>{transaction.date}</td>
            <td>{transaction.type}{transaction.receiver}</td>
            <td className={`${transaction.color}`}>{transaction.amount}</td>
          </tr>
        ))}
      </React.Fragment>
    )
  }

  return (
      <div className="modal-background">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Extrato</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <table id="statement" className="table table-striped">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {listTransactions()}
              </tbody>
            </table>
            <hr/>
          </Modal.Body>
          <Modal.Footer>
            <div className="float-right">
              <button type="button" onClick={() => props.setModalType('none')} className="btn btn-outline-dark m-1">Fechar</button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
}


export default StatementModal;


// const listTransactions = async () => {
//   const test = ["um", "dois", "três", "quatro", "cinco"]
//   const response = await axios.post(
//     `${url()}/users/find`,
//     { security_number: props.user.security_number},
//     { withCredentials: true }
//   );
//   const transactions = response.data.user.transactions;

//   const editedTransactions = transactions.map((transaction) => {
//     const info = { date: transaction.created_at, type: transaction.type, amount: transaction.amount, color:"", receiver: ""}

//     if (info.type === "transfer" && transaction.payer_id === transaction.user.id) {
//       info.receiver = `para ${transaction.receiver_name}`
//     }
//     if (transaction.payer_id === response.data.user.id) {
//       info.color = "text-warning "
//       info.amount = info.amount * -1
//     }

//     return info
//   })

//   return (
//     <React.Fragment>
//       {test.map(transaction => (
//         <tr>
//           <td>transaction</td>
//         </tr>
//       ))}
//     </React.Fragment>
//   )
// }
