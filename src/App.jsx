import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DepositWithdraw from './DepositeWithdraw'

function App() {
  const [state, setState] = useState({})
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  return (
    <div style={{ display:"flex", flexDirection:"column",gap:"10px", }}>
      <DepositWithdraw />
      {/* <input type="text" name="deposit" onChange={handleChange} placeholder="deposer de l'argent" style={{padding:"10px"}} />
      <input type="text" name="withdraw" onChange={handleChange} placeholder="recuperer de l'argent" style={{padding:"10px"}} />
      <input type="text" name="borrow" onChange={handleChange} placeholder="emprunter de l'argent" style={{padding:"10px"}} />
      <input type="text" name="repay" onChange={handleChange} placeholder="repayer de l'argent" style={{padding:"10px"}} /> */}
    </div>
  )
}

export default App
