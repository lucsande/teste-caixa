import React from 'react'
import axios from "axios";
import url from "./modals/url"

const ActionsList = (props) => {
  return(
    <div id="actions-list">
      <h5>O que gostaria de fazer hoje?</h5>
      <button onClick={() => props.setModalType("depositModal")} className="btn btn-dark">Fazer depósito</button>
      <button onClick={() => props.setModalType("withdrawalModal")} className="btn btn-dark">Fazer saque</button>
      <button onClick={() => props.setModalType("transferModal")} className="btn btn-dark">Fazer transferência</button>
      <button onClick={() => fetchTransactions(props)} className="btn btn-dark">Ver extrato</button>
      <button onClick={() => props.setModalType("deleteModal")} className="btn btn-outline-danger">Apagar conta</button>
    </div>
  )
}

const fetchTransactions = async (props) => {
  const response = await axios.post(
    `${url()}/users/find`,
    { security_number: props.user.security_number},
    { withCredentials: true }
  );
  const transactions = response.data.user.transactions;

  const editedTransactions = transactions.map((transaction) => {
    const info = {
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
      color:"",
      receiver: ""
    }

    if (info.type === "transfer" && transaction.payer_id === response.data.user.id) {
      info.receiver = ` para ${transaction.receiver_name}`
    }
    if (info.type === "transfer" && transaction.receiver_id === response.data.user.id) {
      info.receiver = ` de ${transaction.payer_name}`
    }
    if (info.type !== "deposit" && transaction.payer_id === response.data.user.id) {
      info.color = "text-danger"
      info.amount = `- R$${Number(info.amount).toFixed(2)}`
    } else {
      info.color = "text-success"
      info.amount = `+ R$${Number(info.amount).toFixed(2)}`
    }

    switch (info.type) {
      case "transfer":
        info.type = "transferência"
        break;
      case "deposit":
        info.type = "depósito"
        break;
      default:
        info.type = "saque"
    }



    return info
  })

  props.setModalType("statementModal")
  props.setTransactions(editedTransactions)
}

export default ActionsList;
