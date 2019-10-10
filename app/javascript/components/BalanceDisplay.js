import React from 'react'

const BalanceDisplay = (props) => {
  return(
    <div className="balance-display">
      <h5>Seu saldo atual é de:</h5>
      <h2>R${Number(props.user.balance).toFixed(2)}</h2>
    </div>
  )
}

export default BalanceDisplay;
