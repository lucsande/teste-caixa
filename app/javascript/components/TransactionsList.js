// import React from 'react'
// import axios from "axios"
// import url from "./url"

//  const TransactionsList = async (props) => {
//     const response = await axios.post(
//       `${url()}/users/find`,
//       { security_number: props.user.security_number},
//       { withCredentials: true }
//     );
//     return (
//       response.data.user.transactions.map((transaction) => {
//         const info = { date: transaction.created_at, type: transaction.type, amount: transaction.amount, color:"", receiver: ""}
//         if (info.type === "transfer" && transaction.payer_id === transaction.user.id) {
//           info.receiver = `para ${transaction.receiver_name}`
//         }
//         if (transaction.payer_id === transaction.user.id) {
//           info.color = "text-warning "
//           info.amount = info.amount * -1
//         }

//         <tr className={`${info.color}`}>
//           <td>{transaction.date}</td>
//           <td>{transaction.type}{info.receiver}</td>
//           <td>{info.amount}</td>
//         </tr>
//       )
//     })
//     console.log(test)
//     return null
//   }

//   export default TransactionsList;




// const TransactionsList = async (props) => {
//   const response = await axios.post(
//     `${url()}/users/find`,
//     { security_number: props.user.security_number},
//     { withCredentials: true }
//   );
//   const setInfo = (transaction) => {
//     const info = { date: transaction.created_at, type: transaction.type, amount: transaction.amount, color:"", receiver: ""}
//     if (info.type === "transfer" && transaction.payer_id === transaction.user.id) {
//       info.receiver = `para ${transaction.receiver_name}`
//     }
//     if (transaction.payer_id === transaction.user.id) {
//       info.color = "text-warning "
//       info.amount = info.amount * -1
//     }
//     return info
//   }


//     return (
//       {
//         response.data.user.transactions.map((transaction) => {
//           <tr>
//             <td>{transaction.date}</td>
//             <td>{transaction.type}{transaction.receiver_name}</td>
//             <td>{transaction.amount}</td>
//           </tr>
//         )}
//       }
//     )
//   console.log(test)
//   return null
// }

// export default TransactionsList;

