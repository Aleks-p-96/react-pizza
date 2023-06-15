import React from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState()
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6429ff9c00dfa3b5473de2b4.mockapi.io/items/${id}`
        );
        setPizza(data);
        console.log(data)
      } catch (error) {
        alert('Ошибка при запросе')
        navigate('/')
      }
    }
    fetchPizza()
    
  }, [])

  if (!pizza) {
    return 'Downloading...'
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas fugiat harum ullam aperiam autem, maiores voluptates illum eligendi modi corrupti inventore voluptate corporis animi nobis aspernatur, distinctio laudantium aut? Ut.</p>
      <h4>{pizza.price}</h4>
    </div>
  );
}

export default FullPizza;
