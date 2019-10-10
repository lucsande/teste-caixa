import React from 'react'

const ActionsList = (props) => {
  return(
    <div id="actions-list">
      <h5>O que gostaria de fazer hoje?</h5>
      <button onClick={() => props.setModalType("withdrawalModal")} className="btn btn-dark">Fazer saque</button>
      <button onClick={() => props.setModalType("depositModal")} className="btn btn-dark">Fazer depósito</button>
      <button onClick={() => props.setModalType("transferModal")} className="btn btn-dark">Fazer transferência</button>
      <button className="btn btn-dark">Ver extrato</button>
      <button className="btn btn-outline-danger">Apagar conta</button>
    </div>
  )
}

export default ActionsList;
