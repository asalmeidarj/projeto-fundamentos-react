import { useEffect, useState } from "react";

export const useHttpRequest = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState('GET');

  const httpConfig = (data, method, headersConfig={'Content-Type': 'application/json'}) => {
    if(method === "POST") {
      setConfig({
        method,
        headers: {
          ...headersConfig
        },
        body: JSON.stringify(data)
      });
      setMethod(method)
    }
  }

  useEffect(() => {
    async function httpRequest() {
      if (method === "POST") {
        let requestOptions = [url, config];

        const res = await fetch(...requestOptions);
        const json = await res.json();

        setData(json);
      }
      if (method === "GET") {
        const res = await fetch(url);
        const json = await res.json();

        setData(json);
      }
    }
    httpRequest();
  }, [config, method, url]);

  return { data , httpConfig };
};
