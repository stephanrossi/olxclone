import React from "react"
import { useSelector, useDispatch } from "react-redux"

function Home() {
  const name = useSelector((state) => state.UserReducer.name)
  const counter = useSelector((state) => state.UserReducer.counter)

  const dispatch = useDispatch()

  const handleName = () => {
    dispatch({
      type: "SET_NAME",
      payload: { name: "Stephan" },
    })
  }

  const handleIncrement = () => {
    dispatch({
      type: "INCREMENT_COUNTER",
    })
  }

  return (
    <>
      <h4>Página Home</h4>
      NOME: {name}
      <br />
      Contador: {counter}
      <br />
      <button onClick={handleName}>Mudar nome</button>
      <button onClick={handleIncrement}>+1</button>
    </>
  )
}

export default Home
