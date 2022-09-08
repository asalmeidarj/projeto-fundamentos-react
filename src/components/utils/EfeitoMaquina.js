import React from 'react'

import styles from './efeitoMaquina.module.css';

const EfeitoMaquina = ({texto}) => {

    function funcMaquinaEscrever (elemento) {

        const textoArray = elemento.innerHTML.split('');
        elemento.innerHTML = "";
    
        textoArray.forEach((letra, i) => {
            setTimeout(() => {
                elemento.innerHTML += letra;
            }, 75*i);
        });
    }

  return (
    <div className={styles.container}>
        <h2 id="textoEfeitoMaquina" className={styles.title}> {texto} </h2>
          <script>
              {setTimeout(()=> {
                funcMaquinaEscrever(document.getElementById("textoEfeitoMaquina"))
              }, 0.1)}
          </script>
    </div>
  )
}

export default EfeitoMaquina