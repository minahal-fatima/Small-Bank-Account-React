import React from 'react'
import {useReducer} from 'react';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,

}

function reducer(state, action){
  if (!state.isActive && action.type !== "open") return state;

  switch(action.type){
    case "open":
      return{...state, balance: 500, isActive: true};

    case "deposit":
      return{...state, balance: state.balance + action.payload};

    case "withdraw":
      return{...state, balance: state.balance - action.payload};

    case "requestALoan":
      if(state.loan > 0) return state;
      return{...state, loan: action.payload, balance: state.balance + action.payload};

    case "payLoan":
      return{...state, loan: 0, balance: state.balance - state.loan};

    case "close":
      // if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw Error("Account not recognized");
  }
}

export default function App() {

  const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);


  return (
    <div className='App'>
      <div className='account-container'>
        <h1>Bank Account</h1>
        <div className="account-details">
          <p>balance: {balance}</p>
          <p>Loan: {loan}</p>
        </div>
      
        <div className="button-group">
          <button
            onClick={() => dispatch({ type: "open" })}
            disabled={isActive}
          >
            Open account
          </button>

          <button onClick={() => dispatch({type: "deposit", payload: 150})} disabled={!isActive}>
            Deposit 150
          </button>

          <button onClick={() => dispatch({type: "withdraw", payload: 100})} disabled={!isActive}>
            Withdraw 100
          </button>

          <button onClick={() => dispatch({type: "requestALoan", payload: 5000})} disabled={!isActive}>
            Request a loan of 5000
          </button>

          <button onClick={() => dispatch({type: "payLoan"})} disabled={!isActive}>
            Pay Loan
          </button>

          <button onClick={() => dispatch({type: "close"})}>
            Close Account
          </button>
      </div>
      </div>
    </div>
  )
}
