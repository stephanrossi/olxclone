import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { PageArea, SearchArea } from "./styled"
import { PageContainer } from "../../components/MainComponents"
import useApi from "../../helpers/OlxApi"
import AdItem from "../../components/partials/AdItem"

function Home() {
  const api = useApi()

  const [stateLoc, setStateLoc] = useState("")
  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adList, setAdList] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories()
      setCategories(cats)
    }
    getCategories()
  }, [])

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates()
      setStateList(slist)
    }
    getStates()
  }, [])

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      })
      setAdList(json.ads)
    }
    getRecentAds()
  }, [])

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form action="/ads" method="get">
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
              ></input>
              <select name="state">
                <option></option>
                {stateList.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((item, index) => (
              <Link
                key={index}
                to={`/ads?cat=${item.slug}`}
                className="categoryItem"
              >
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios recentes</h2>
          <div className="list">
            {adList.map((item, index) => (
              <AdItem key={index} data={item} />
            ))}
          </div>
          <Link to="/ads" className="seeAll">
            Ver todos
          </Link>
          <hr />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
          dui auctor, feugiat justo non, ullamcorper augue. Quisque faucibus
          quam at ultricies suscipit. Nulla dui sem, tristique nec efficitur
          sollicitudin, feugiat sed enim. Mauris tempus metus a dui ultrices
          ornare. Proin fringilla rutrum venenatis. Vivamus in dui venenatis,
          placerat arcu eget, mattis neque. Maecenas faucibus elit quam, at
          luctus mauris rutrum eu.
        </PageArea>
      </PageContainer>
    </>
  )
}

export default Home
