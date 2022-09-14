import React, { useState } from "react";

import styles from "./cadastrarCards.module.css";

const CadastrarCards = () => {
  const [files, setFiles] = useState("");
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
  // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(true);
  //for displaying response message
  const [requestResponse, setRequestResponse] = useState(null);
  // validation inputs
  const [validationMensage, setValidationMensage] = useState(null);
  //base end point url
  const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080/clash-dados";

  const [nome, setNome] = useState("");
  const [raridade, setRaridade] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [image, setImage] = useState("");

  const uploadFileHandler = (e) => {
    e.preventDefault();
    setImage("");
    setFiles(e.target.files);
    if (e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setFileUploadProgress(true)
    setImage("");
    uploadFileHandler(e)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFileSize(true);
    setFileUploadProgress(true);
    setRequestResponse(null);
    setValidationMensage(null);

    const formData = new FormData();

    if (!files) {
      setFileUploadProgress(false);
    }

    if (files[0]?.size > 1000000) {
      setFileSize(false);
      return
    }

    formData.append("file", files[0]);
    formData.append("nome", nome);
    formData.append("raridade", raridade);
    formData.append("tipo", tipo);
    formData.append("descricao", descricao);

    if (!(nome && raridade && tipo && descricao)) {
      setValidationMensage("Contém algum campo vazio!");
      return;
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    /*for(let i = 0; i < 110; i++){
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
          setRequestResponse({'bad': 'Ocorreu algum erro na conexão!'});
          return Promise.reject(error);
        }
        
        setRequestResponse({'ok': "Cadastro realizado com sucesso!"});
      })
      .catch((error) => {
        console.error("Erro:", error);       
      });
    }*/
    
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
          setRequestResponse({'bad': 'Ocorreu algum erro na conexão!'});
          return Promise.reject(error);
        }
        
        setRequestResponse({'ok': "Cadastro realizado com sucesso!"});
      })
      .catch((error) => {
        console.error("Erro:", error);       
      });
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
      <label className={styles.container_upload}>
        <div className={styles.btn_upload}>
          <div className={styles.icon_upload}>
            <img src="/icons/upload-de-arquivo.png" alt="upload" />
          </div>
        </div>
        <div className={styles.container_imagemPreview}>
          <div className={styles.section_imagemPreview}>
            {!image ? (
              <h3 className={styles.texto_imagemPreview}>
                Selecione uma imagem
              </h3>
            ) : (
              <div>
                <img
                  src={image}
                  alt="imagem selecionada"
                  className={styles.img_imagemPreview}
                ></img>
                <div
                  id="icon_close"
                  className={styles.icon_close}
                  onClick={closeHandler}
                >
                  X
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="file"
          id="input_file_upload"
          name="input_file_upload"
          multiple
          className={styles.input_upload}
          onChange={uploadFileHandler}
        />
      </label>
      <div className={styles.container_btn_enviarForm}>
        <button type="submit" className={styles.btn_enviarForm}>
          Cadastrar
        </button>
      </div>
      <div className={styles.container_validation}>
        {!fileSize && <p style={{ color: "red" }}>File size exceeded!!</p>}
        {!fileUploadProgress && (
          <p style={{ color: "red" }}>Falha no carregamento da Imagem!</p>
        )}
        {validationMensage && (
          <p style={{ color: "red" }}>{validationMensage}</p>
        )}
        {requestResponse?.bad !== null && (
          <p style={{ color: "red" }}>{requestResponse?.bad}</p>
        )}
        {requestResponse?.ok !== null && (
          <p style={{ color: "green" }}>{requestResponse?.ok}</p>
        )}
      </div>
    </form>
  );
};
export default CadastrarCards;
