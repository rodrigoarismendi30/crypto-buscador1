import axios from 'axios'
import React, { useState , useEffect} from 'react'

const Crypto = () => {

//* setear  los hooks

const [search, setSearch] = useState("")
const  [cryptos, setCryptos] = useState( [] )


//* funcion para traer los datos
const endpoint =  'https://api.coingecko.com/api/v3/coins'

const showData = () => {
    axios.get(endpoint).then ( (res) => {
        setCryptos(res.data)
    })
    
}
useEffect( () => {
    showData()
},[])



//* funcion de busqueda

const buscador = (e) => {
  setSearch(e.target.value)
}


//*filtrar los datos

const  resultados = !search ? cryptos : cryptos.filter( (val) => val.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <>
      <input value={search} onChange={buscador} type='text' placeholder='Buscar Crypto' className='form-control'/>
      <table className='table table-dark table-hover mt-3'>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Nombre</th>
            <th>Simbolo</th>
            <th>Precio</th>
            <th>Precio 24hrs</th>
          </tr>
        </thead>
        <tbody>
          {
            resultados.map( (resultado) => (
              <tr key={resultado.id}>
                  <td>{resultado.market_data.market_cap_rank}</td>
                  <td><img src= {resultado.image.small}/>{resultado.name}</td>
                  <td>{resultado.symbol.toUpperCase()}</td>
                  <td>{resultado.market_data.current_price.bmd.toFixed(2)}</td>
                  <td>
                    { resultado.market_data.price_change_percentage_24h < 0 ? (
                        <span className='badge bg-danger'>{resultado.market_data.price_change_percentage_24h}</span>
                      ):(
                        <span className='badge bg-success'>{resultado.market_data.price_change_percentage_24h}</span>
                      )
                    }
                  </td>
              </tr>
              
            ))
          }
        </tbody>

      </table>

    </>
  )
}

export default Crypto