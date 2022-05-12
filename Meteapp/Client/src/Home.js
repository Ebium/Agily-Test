import React from "react";
import './styles/Home.css';
import affiche from './App.js'
import search from './styles/search.svg';

// génère la page principale
class Home extends React.Component {
  render() {
    return (
      <div className="home" >
        <div className="home_header">
          <h1 id="home_title">The Forecast<br />Weather App</h1>
          <div id="ville_input_button">
            <input type="text" id="VilleInput" placeholder="Search" onKeyPress={(event) => { beforeSubmitInput(event.key, this.props.rootprop) }} />
            <button id="VilleButton" onClick={() => { beforeSubmitButton(this.props.rootprop) }}>
              <img src={search} className="search-svg" alt="logo" />
            </button>
          </div>
        </div>
      </div>

    );
  }
}

// permet de voir si l'entrée n'est pas nulle pour l'input
function beforeSubmitButton(myroot) {
  if (document.getElementById('VilleInput').value === "") {
    alert("Veuillez entrer le nom d'une ville");
  }
  else {
    affiche(myroot);
  }
}


// permet de voir si l'entrée n'est pas nulle pour le bouton
function beforeSubmitInput(eventkey, myroot) {
  if (eventkey === "Enter") {
    if (document.getElementById('VilleInput').value === "") {
      alert("Veuillez entrer le nom d'une ville");
    }
    else {
      affiche(myroot);
    }
  }
}


export default Home;

