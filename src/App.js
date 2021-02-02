import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Coin } from './Coin';
function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('');
  useEffect(()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(res => {
      setCoins(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  },[])

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  const filterCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='coin-app'>
      <div className="coin-search">
        <h1 className='coin-text' >Buscar una criptomoneda</h1>
        <form>
          <input type="text" placeholder='Buscar' className='coin-input' onChange={handleChange}/>
        </form>

      </div>
      {filterCoins.map(coin=>{
        return(
          <Coin 
            key={coin.id} 
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
