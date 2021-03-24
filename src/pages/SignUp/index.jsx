import React, { useState, useEffect } from "react"
import { PageArea } from "./styled"
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents"
import useApi from "../../helpers/OlxApi"
import { doLogin } from "../../helpers/AuthHandler"

function SignUp() {
  const api = useApi()

  const [name, setName] = useState("")
  const [stateLoc, setStateLoc] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")
  const [stateList, setStateList] = useState([])

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates()
      setStateList(slist)
    }
    getStates()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Senha e confirmação não são iguais")
      setDisabled(false)
      setPassword("")
      setConfirmPassword("")
      setError("")
      return
    }

    const json = await api.register(name, email, password, stateLoc)

    if (json.error) {
      setError(json.error)
      setDisabled(false)
      setPassword("")
      setConfirmPassword("")
      setError("")
    } else {
      doLogin(json.token)
      window.location.href = "/"
    }
  }

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome completo:</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado:</div>
            <div className="area--input">
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option></option>
                {stateList.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Confirme a senha:</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Cadastrar
              </button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignUp
