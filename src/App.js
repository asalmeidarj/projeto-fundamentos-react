import { useState } from "react";
import "./App.css";
import Home from "./components/home/Home";
import Cards from "./components/cards/Cards";
import About from "./components/about/About";

import {preventDefaultTag} from "./utils/functions/functions"

function App() {

  let url = 'http://localhost:3000/home';
  let [page, setPage] = useState(url)

  const handleLoadEvents = () => {
    const elements = document.getElementsByTagName('a');
    for(const element of elements){
      element.addEventListener('click', () => {
        setPage(element.href)
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav-container">
          <div className="logo-container">
            <img src="/icons/logo.png" alt="logo" />
            <h1>Clash Dados</h1>
          </div>
          <div>
            <ul>
              <li><a href="./home">Home</a></li>
              <li><a href="./cards">Cards</a></li>
              <li><a href="./about">About</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="App-main">
        {page === "http://localhost:3000/home" && <Home />}
        {page === "http://localhost:3000/cards" && <Cards />}
        {page === "http://localhost:3000/about" && <About />}
      </main>
      <script>
        {setTimeout(()=>{preventDefaultTag('a')}, 1)};
        {setTimeout(()=>{handleLoadEvents()}, 1)}
      </script>
    </div>
  );
}

export default App;
