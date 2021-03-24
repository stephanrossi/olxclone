import React, { useState } from "react"
import { PageArea } from "./styled"
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents"
import useApi from "../../helpers/OlxApi"
import { doLogin } from "../../helpers/AuthHandler"

function SignIn() {
  const api = useApi()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberPassword, setRememberPassword] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    setError("")

    const json = await api.login(email, password)

    if (json.error) {
      setError(json.error)
      setDisabled(false)
      setPassword("")
    } else {
      doLogin(json.token, rememberPassword)
      window.location.href = "/"
    }
  }

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
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
            <div className="area--title">Lembrar senha</div>
            <div className="area--check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Login
              </button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignIn
