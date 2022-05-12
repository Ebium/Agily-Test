import React from "react";
import "./styles/App.css"
import arrow from './styles/left-arrow.svg';
import Home from "./Home.js";

/*-------------------------*/

var value_main_card = 0; // valeur de la carte principale ( 0 pour aujourd'hui, 1 pour demain etc )
var data_meteo; // données reçues par l'API

/*-------------------------*/

// génère les 7 cartes placées à droite
class Card extends React.Component {
  render() {
    return (
      <button className='card-button' onClick={() => swapcard(this.props.value)}>
        <div className='card-bg'>
          <img src={"http://openweathermap.org/img/w/" + data_meteo[this.props.value].icon + ".png"} className="card-icon" alt="logo" />
          <div className='cardjouretmois'>
            <div className='strjour'>{this.props.strjour}</div>
            <div className='strmoisjour'>{this.props.strmoisjour}</div>
          </div>
          <div className='strtemp'>{this.props.strtemp}°C</div>
        </div>
      </button>
    );
  }
}

// gère la colonne des 7 cartes
class Cardcolumn extends React.Component {

  // permet de créer la carte du jour correspondant
  CreateCard(i) {
    var date = new Date(data_meteo[i].dt * 1000);
    var jourstr = jour(date);
    var moisjourstr = moisjour(date);
    var temperature = data_meteo[i].temp_max;
    return <Card value={i} strmoisjour={moisjourstr} strjour={jourstr} strtemp={temperature} />;
  }

  render() {
    return (
      <div id="card-column">
        <div id="card-column-1">
          {this.CreateCard(1)}
          {this.CreateCard(2)}
          {this.CreateCard(3)}
          {this.CreateCard(4)}
        </div>

        <div id="card-column-2">
          {this.CreateCard(5)}
          {this.CreateCard(6)}
          {this.CreateCard(7)}
        </div>

      </div>
    );
  }
}



// génére la carte du jour même ainsi que 7 autres pour les 7 prochains jours ( seront cachées au début )
class Maincard extends React.Component {

  // pour désactiver les 7 jours sur la carte principale, ils seront affichés grâce à la fonction swapcard
  componentDidMount = () => {
    if (this.props.value >= 1) {
      document.getElementById("main_card_" + this.props.value).style.display = "none";
    }
  };

  // récupère le jour ( en lettre et en nombre ) ainsi que le mois
  getjour() {
    var date = new Date(data_meteo[this.props.value].dt * 1000);
    var jourstr = jour(date);
    var moisjourstr = moisjour(date);
    return (jourstr + " " + moisjourstr);
  }

  render() {
    return (
      <div className="main_card_bg" id={"main_card_" + this.props.value}>
        <div className="main_card_icon_date">
          <img src={"http://openweathermap.org/img/w/" + data_meteo[this.props.value].icon + ".png"} className="main_card_icon" alt="logo" />
          <div className="main_card_date">{this.getjour()}</div>
        </div>
        <div className="main_card_infos">
          <div className="main_card_liste">
            <div className="info1">Jour - {data_meteo[this.props.value].temp_day} °C</div>
            <div className="info2">Nuit - {data_meteo[this.props.value].temp_night} °C</div>
            <div className="info3">Humidité - {data_meteo[this.props.value].humidity}%</div>
          </div>
          <div className="main_card_liste">
            <div className="info4">Pression - {data_meteo[this.props.value].pressure}hPa</div>
            <div className="info5">Vent - {data_meteo[this.props.value].wind_speed} Km/h</div>
          </div>

        </div>
      </div>
    );
  }
}


// génère le rendu total de la deuxième page
class AppMeteo extends React.Component {
  render() {
    return (

      <div id="main">
        <img src={"" + data_meteo[8]} id="background_image" alt="*Ville*"></img>
        <div id="background_overlay"></div>

        <button id="arrow_back_div" onClick={() => backToHome(this.props.rootprops)}>

          <div className="arrow-bg">
            <img src={arrow} className="arrow-svg" alt="logo" />
          </div>
        </button>

        <Maincard value={0} />
        <Maincard value={1} />
        <Maincard value={2} />
        <Maincard value={3} />
        <Maincard value={4} />
        <Maincard value={5} />
        <Maincard value={6} />
        <Maincard value={7} />

        <Cardcolumn />

      </div>
    );

  }
}


// fonction appellée après l'envoie de la ville de la première page
function affiche(myroot) {
  var city = document.getElementById('VilleInput').value
  fetch("/getmeteo/" + city)
    .then(response => response.json())
    .then(res => {
      data_meteo = res;
      myroot.render(<AppMeteo rootprops={myroot} />);
    })
    .catch((error) => {
      console.error(error);
      alert("Nom de ville valide réquis");
    });
}


// permet de retourner sur la page principale
function backToHome(myroot) {
  data_meteo = null;
  myroot.render(<Home rootprop={myroot} />);
}


// échange les cartes quand on clique sur une des 7 à droite
function swapcard(i) {
  if (value_main_card === 0) {
    document.getElementById("main_card_" + value_main_card).style.display = "none";
    value_main_card = i;
    document.getElementById("main_card_" + value_main_card).style.display = "block";
  }
  else if (value_main_card === i) {
    document.getElementById("main_card_" + value_main_card).style.display = "none";
    value_main_card = 0;
    document.getElementById("main_card_" + value_main_card).style.display = "block";
  }
  else if (value_main_card !== 0) {
    document.getElementById("main_card_" + value_main_card).style.display = "none";
    value_main_card = i;
    document.getElementById("main_card_" + value_main_card).style.display = "block";
  }
  else {
    console.log("probleme SWAPCARD");
  }
}



// permet de renvoyer le jour et le mois à partir d'une date ( en francais ) , exemple : 5 Mars
function moisjour(date) {
  const lesmois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  var jour = date.toLocaleDateString("fr").slice(0, 2);
  if (jour.slice(0, 1) === "0") jour = jour.slice(1, 2);
  var mois = date.toLocaleDateString("fr").slice(3, 5);
  if (mois.slice(0, 1) === "0") mois = lesmois[parseInt(mois.slice(1, 2)) - 1];
  return (jour + " " + mois);
}

// permet de renvoyer le jour à partir d'une date ( en lettre ), exemple : Mardi
function jour(date) {
  var days = { "Mon": "Lundi", "Tue": "Mardi", "Wed": "Mercredi", "Thu": "Jeudi", "Fri": "Vendredi", "Sat": "Samedi", "Sun": "Dimanche" };
  var temp = date.toString().slice(0, 3);
  return ("" + days[temp]);
}



export default affiche;