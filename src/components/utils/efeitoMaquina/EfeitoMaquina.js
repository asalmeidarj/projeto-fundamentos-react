import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./efeitoMaquina.module.css";

const EfeitoMaquina = ({ texto, className, timeout }) => {
  const [id] = useState("textoEfeitoMaquina__" + Math.random() * 10000);
  const [text, setText] = useState("");
  async function funcMaquinaEscrever(elemento) {
    setTimeout(() => {
      setText(texto);
      elemento.innerHTML = text;

      const textoArray = elemento.innerHTML.split("");
      elemento.innerHTML = "";
      textoArray.forEach((letra, i) => {
        setTimeout(() => {
          elemento.innerHTML += letra;
        }, 75 * i);
      });
    }, timeout);
  }

  return (
    <div className={styles.container}>
      <h2 id={id} className={className + " " + styles.title}>
        {" "}
      </h2>
      <script>
        {useEffect(() => {
          funcMaquinaEscrever(document.getElementById(id));
        })}
      </script>
    </div>
  );
};

export default EfeitoMaquina;
