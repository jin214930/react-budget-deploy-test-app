import React, { useState } from 'react'
import './App.css'
import ExpenseForm from './components/js/ExpenseForm'
import ExpenseList from './components/js/ExpenseList'
import Alert from './components/js/Alert'

const App = () => {
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState(0)
  const [alert, setAlert] = useState({show: false})
  const [id, setId]  = useState('')
  const [edit, setEdit] = useState(false)

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 }
  ])

  const handleCharge = (event) => {
    setCharge(event.target.value)
  }

  const handleAmount = (event) => {
    setAmount(event.target.valueAsNumber)
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
    handleAlert({type: 'danger', text: '아이템이 삭제되었습니다.'})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(charge !== '' && amount > 0) {
      if(edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: 'success', text: '아이템이 수정되었습니다.'})
      }
      else {
        const newExpense = { id: crypto.randomUUID(), charge, amount }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses);
        handleAlert({type: 'success', text: '아이템이 생성되었습니다.'})
      }
      setCharge('')
      setAmount(0)
    }
    else
      handleAlert({type: 'danger', text: '잘못된 값을 입력했습니다.'})
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})
    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id)
    const {charge, amount} = expense
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  const clearItems = () => {
    setExpenses([])
  }

  return (
    <main className='main-container'>
      {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}

      <h1>예산 계산기</h1>
      
      <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        {/* Expanse Form */}
        <ExpenseForm 
        handleCharge={handleCharge}
        charge={charge}
        handleAmount={handleAmount}
        amount={amount}
        handleSubmit={handleSubmit}
        edit={edit}
        />
      </div>

      <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
        {/* Expense List */}
        <ExpenseList 
        expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
        />
      </div>

      <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
        <p style={{fontSize: '2rem'}}>
          총지출:
          <span>
            {expenses.reduce((acc, cur) => {
              return acc + cur.amount;
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}

export default App;