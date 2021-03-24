import React from "react"
import HeaderArea from "./styled"
import { Link } from "react-router-dom"

import { isLogged, doLogout } from "../../../helpers/AuthHandler"

function Header() {
  let logged = isLogged()

  const handleLogout = () => {
    doLogout()
    window.location.href = "/"
  }

  return (
    <>
      <HeaderArea>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <span className="logo-1">S</span>
              <span className="logo-2">O</span>
              <span className="logo-3">R</span>
            </Link>
          </div>
          <nav>
            <ul>
              {logged && (
                <>
                  <li>
                    <Link to="/my-account">Minha conta</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                  <li>
                    <Link to="/post-an-ad" className="button">
                      Postar anúncio
                    </Link>
                  </li>
                </>
              )}

              {!logged && (
                <>
                  <li>
                    <Link to="/signin">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Cadastrar</Link>
                  </li>
                  <li>
                    <Link to="/signin" className="button">
                      Postar anúncio
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </HeaderArea>
    </>
  )
}

export default Header
