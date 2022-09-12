import React, { useEffect } from 'react'

import { useState } from 'react';

const ListaCards = () => {

  const url = 'http://localhost:8080/clash-dados/card'

  const [cards, setCards] = useState([]);  

  useEffect(() => {
      async function fetchData() {
          const res = await fetch(url);
          const data = await res.json();

          setCards(data);
      }

      fetchData();
  }, []);
  
  console.log({cards});

  return (
    <div>
        <h1>Lista de Cards</h1>

    </div>
  )
}

export default ListaCards