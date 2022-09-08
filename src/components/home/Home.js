import React from 'react'
import EfeitoMaquina from '../utils/EfeitoMaquina';

import styles from './home.module.css';

const Home = () => {
  
  const saudacao =  `Este Projeto foi feito para aplição dos conceitos básicos 
    de React. Espero que goste!`;
  return (
    <section className={styles.main}>
        <div className={styles.container}>
            <section className={styles.saudacao}>
                <EfeitoMaquina texto={saudacao}/>
            </section>
            <section className={styles.ancora}>
                <a href='/cards'><button className={'button-85 ' + styles.btn_85 }>Acesse os cards!</button></a>
            </section>
        </div>
    </section>
  )
}

export default Home