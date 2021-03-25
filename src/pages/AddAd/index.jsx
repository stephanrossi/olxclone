import React, { useState, useRef, useEffect } from "react"
import { PageArea } from "./styled"
import { useHistory } from "react-router-dom"
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents"
import useApi from "../../helpers/OlxApi"
import MaskedInput from "react-text-mask"
import createNumberMask from "text-mask-addons/dist/createNumberMask"

function SignIn() {
  const api = useApi()
  const fileField = useRef()
  const history = useHistory()

  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [priceNegotiable, setPriceNegotiable] = useState(false)
  const [description, setDescription] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories()
      setCategories(cats)
    }
    getCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    let errors = []

    if (!title.trim()) {
      errors.push("Informe o título do anúncio.")
    }

    if (!category) {
      errors.push("Informe a categoria do anúncio.")
    }

    if (errors.length === 0) {
      const fData = new FormData()
      fData.append("title", title)
      fData.append("price", price)
      fData.append("priceneg", priceNegotiable)
      fData.append("desc", description)
      fData.append("cat", category)

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append("img", fileField.current.files[i])
        }
      }

      const json = await api.addAd(fData)

      if (!json.error) {
        history.push(`/ad/${json.id}`)
        return
      } else {
        setError(json.error)
      }
    } else {
      setError(errors.join("\n"))
    }

    setDisabled(false)
  }

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  })

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título:</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria:</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço:</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$"
                disabled={disabled || priceNegotiable}
                value={priceNegotiable ? "" : price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Valor negociável:</div>
            <div className="area--check">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição:</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens do anúncio:</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                ref={fileField}
                multiple
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Anunciar
              </button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignIn
