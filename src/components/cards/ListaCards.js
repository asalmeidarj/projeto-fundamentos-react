import React, { useEffect, useState } from "react";

import { useHttpRequest } from "../../hooks/useHttpRequest";
import { useWindowSize } from "../../hooks/useWindowSize";

import styles from "./listaCards.module.css";

const ListaCards = () => {
  const url = "http://localhost:8080/clash-dados/cards";

  const [cards, setCards] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayPageIndex, setArrayPageIndex] = useState([]);
  const [list, setList] = useState([]);
  const [windowSize] = useWindowSize();
  const [numCardsPage, setNumCardsPage] = useState(12)

  /** Função busca a lista de cards  no banco de dados*/
  const {data: items} = useHttpRequest(url)

  /** Atualização do array de cards */
  useEffect(() => {
    async function getCards() {
      setCards(items)
    }
    getCards()
  }, )

  useEffect(() => {
    async function handleSetNumCardsPage() {
      if(windowSize < 700) {
        return setNumCardsPage(6)
      }
      if(windowSize >= 700 && windowSize < 900){
        return setNumCardsPage(6)
      }
      if(windowSize >= 900 && windowSize < 1100){
        return setNumCardsPage(8)
      }
      if(windowSize >= 1100 && windowSize < 1330){
        return setNumCardsPage(10)
      }
      return setNumCardsPage(12)

    }
    handleSetNumCardsPage()
  }, [windowSize])

  /** Função determina o número de páginas tal que o máximo de cards por página
   *  seja igual a numCardsPage
   */
  useEffect(() => {
    async function getNumPages() {
      if(cards){
        setNumPages(Math.ceil(cards.length / numCardsPage));
      }    
    }
    getNumPages();
  }, [cards, numCardsPage]);

  /** Função adiciona ao vetor pageIndex as numerações das páginas */
  useEffect(() => {
    async function getIndex() {
      let arrayIndex = [];
      for (let i = 1; i <= numPages; i++) {
        arrayIndex.push(i);
      }
      setArrayPageIndex(arrayIndex);
    }
    getIndex();
    if(currentPage > numPages){
      setCurrentPage(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  /** Função carrega a lista a ser renderizada */
  useEffect(() => {
    if(!cards){
      return
    }
    const loadList = async () => {
      const startIndex = numCardsPage * (currentPage - 1);
      let stopIndex = numCardsPage * currentPage - 1;
      if (stopIndex >= cards.length) {
        stopIndex = cards.length - 1;
      }
  
      let arrayTemp = [];
      for (let i = startIndex; i <= stopIndex; i++) {
        arrayTemp.push(cards[i]);
      }
  
      setList(arrayTemp);
    };
    loadList(currentPage)
  }, [cards, numPages, currentPage, numCardsPage]);


  const handleSetPage = (e) => {
    setCurrentPage(e.target.value)
  }

  return (
    <div id={styles.container_lista}className={styles.container_lista}>
      <ul className={styles.ul_lista}>
        {list.map((card) => (
          <li key={card.id_card} id={card.id_card} className={styles.items}>
            <img src={card.url_imagem} alt=""></img>
          </li>
        ))}
        <div className={styles.div_icon_avancar}>
          <img src="/icons/seta_esquerda.png" alt="seta esquerda" />
        </div>
        <div className={styles.div_icon_voltar}>
        <img src="/icons/seta_direita.png" alt="seta direita" />
        </div>
      </ul>
      <div className={styles.container_btn_pages}>
        {arrayPageIndex.map((index) => (
          <button key={"btn_pages_" + index} className={styles.btn_pages} value={index} onClick={handleSetPage} >
            {index}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaCards;
