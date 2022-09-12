import React, { useState } from "react";

import styles from './cadastrarCards.module.css';

const CadastrarCards = () => {
  const [files, setFiles] = useState("");
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
  // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  //for displaying response message
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
  //base end point url
  const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080/clash-dados";

  const [nome, setNome] = useState("");
  const [raridade, setRaridade] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFileSize(true);
    setFileUploadProgress(true);
    setFileUploadResponse(null);

    const formData = new FormData();

    if (files[0].size > 1000000) {
      setFileSize(false);
      setFileUploadProgress(false);
      setFileUploadResponse(null);
      return;
    }

    formData.append("file", files[0]);
    formData.append("nome", nome);
    formData.append("raridade", raridade);
    formData.append("tipo", tipo);
    formData.append("descricao", descricao);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(FILE_UPLOAD_BASE_ENDPOINT + "/cadastrar-cards", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        //console.log(response.ok);
        if (!response.ok) {
          // get error message
          const error = (data && data.message) || response.status;
          setFileUploadResponse(data.message);
          return Promise.reject(error);
        }

        console.log(data);
        setFileUploadResponse("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.error("Ocorreu algum erro!", error);
      });
    setFileUploadProgress(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form_cadastro}>
      <label>
        <h2 className={styles.title}>Cadastro de Card</h2>
      </label>
      <label>
        <span>Nome: </span>
        <input
          type="text"
          value={nome}
          name="nome_card"
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
        />
      </label>
      <label>
        <span>Raridade: </span>
        <input
          type="text"
          value={raridade}
          name="raridade_card"
          onChange={(e) => setRaridade(e.target.value)}
          placeholder="Raridade"
        />
      </label>
      <label>
        <span>Tipo: </span>
        <input
          type="text"
          value={tipo}
          name="tipo_card"
          onChange={(e) => setTipo(e.target.value)}
          placeholder="Tipo"
        />
      </label>
      <label className={styles.container_textarea}>
        <span id={styles.span_descricao}>Descrição do card: </span>
        <textarea
          value={descricao}
          name="descricao_card"
          onChange={(e) => setDescricao(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
      </label>
      <label>
        <span className={styles.btn_enviar}>Escolher Imagem</span>
        <input type="file" multiple className={styles.input_cadastro} onChange={uploadFileHandler} />
      </label>
      
      <button type="submit">Upload</button>
      {!fileSize && <p style={{ color: "red" }}>File size exceeded!!</p>}
      {fileUploadProgress && <p style={{ color: "red" }}>Uploading File(s)</p>}
      {fileUploadResponse != null && (
        <p style={{ color: "green" }}>{fileUploadResponse}</p>
      )}
    </form>
  );
};
export default CadastrarCards;
