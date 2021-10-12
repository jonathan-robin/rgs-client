import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import usePool from "../../hooks/SearchPlayer/usePool";
import Player from "../../classes/player";
import Profil from "../../classes/profil";
import { __player } from "../../classes/player";
import { __profil } from "../../classes/interface/__profil";
import { useHistory } from "react-router-dom";
import InputGroupWithExtras from "react-bootstrap/esm/InputGroup";
import { usePlayersContext } from "../../contex/PlayersContext";

/**
 * Retourne le search Box de Home pour la recherche par Profil
 */
function SearchProfil_search() {
  
  const [profil, setProfil] = useState<Profil>();
  const players = usePlayersContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const history = useHistory();

  // Lorsqu'un clic autre part que sur l'input on le cache
  document.addEventListener("click", function (e:any) {
    if (e.target.id !== 'proposition_player--SearchProfile'){
      document.getElementById('proposition_player--SearchProfile--select')?.classList.add("hidden");
    }
  });

  // Lorsqu'un clic sur input on affiche
  const handleClickInput = () => { 
    if (inputValue !== '') {  document.getElementById('proposition_player--SearchProfile--select')?.classList.remove('hidden') }
    else { document.getElementById('proposition_player--SearchProfile--select')?.classList.add('hidden') }
  }

  // onInput si value est vide on cache sinon on affiche
  const handleOnChange = (event: any) => {
    setInputValue(event.target.value);
    if (event.target.value != ''){ document.getElementById('proposition_player--SearchProfile--select')?.classList.remove('hidden'); setDisplay(true); }
    else{ document.getElementById('proposition_player--SearchProfile--select')?.classList.add('hidden'); setDisplay(false) }
  };

  //Fetch POST on /players pour récupérer infos profil, ensuite on push sur /searchProfile
  function HandleClickPlayer(event: any, player: Player) {
    fetch("https://rgstatsapi.herokuapp.com/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nom: player.player_nom,
        prenom: player.player_prenom,
        id: player.player_id,
        nat: player.player_nat,
        players:players.players
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        history.push({ pathname: "/searchProfile", state: { profil: res, players:players.players} })
      );
  }

  return (
    <div className="row">
      <div className="content-box content-box--profil col-12">
        <div className="content-box__text">
          <div className="sub-title sub-title--profil">
            Recherche par joueur
          </div>
          <div className="text-regular">
            Rentrez le nom d'un joueur dans la barre de recherche. Vous avez
            accès à tous les matchs de ce joueur à Roland Garros, ses
            adversaires, les tours et les résultats de l'ensemble de ses matchs.
            Vous avez aussi accès à des statistiques sur le joueur ; nombre de
            matchs gagnés, ratio de victoire, nationalité, meilleur résultat...
          </div>
        </div>
        <div className="content-box__search content-box__search--profil col">
          <div style={{ display: "inline" }}>
            <input
              id="proposition_player--SearchProfile"
              className="input form-control input--profil"
              type="text"
              placeholder="Nom d'un joueur..."
              value={inputValue}
              onClick={() => handleClickInput()}
              onInput={(event) => handleOnChange(event)}
            />
            {display && (
              <div className="proposition_player hidden" id="proposition_player--SearchProfile--select" >
                {players.players
                  ?.filter(
                    (player: Player) =>
                      player.player_nom
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) > -1 ||
                        player.player_prenom
                          .toLowerCase()
                          .indexOf(inputValue.toLowerCase()) > -1 ||
                        (player.player_nom+' '+player.player_prenom)
                          .toLowerCase()
                          .indexOf(inputValue.toLowerCase()) > -1
                  )
                  .map((player, index) => {
                    return (
                      <div
                        className="propal_joueur"
                        onClick={(event) => HandleClickPlayer(event, player)}
                        tabIndex={0}
                        key={index}
                      >
                        <img
                          className="draw__flag propal"
                          src={
                            require("../../resources/flags/" +
                              player.player_nat +
                              ".png").default
                          }
                        />
                        {player.player_nom} {player.player_prenom}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          {/* <Link to={{ pathname: "/searchProfile", state: { profil: profil } }}>
            <button type="button" className="button button__search--profil">
              Rechercher
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default SearchProfil_search;
