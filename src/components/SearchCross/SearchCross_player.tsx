import React, { useState, useEffect } from "react";
import Player from "../../classes/player";
import { __player } from "../../classes/player";
import { __profil } from "../../classes/interface/__profil";
import $ from 'jquery';
import { usePlayersContext } from "../../contex/PlayersContext";

/**
 * Retourne input player pour la recherche croisée
 */
function SearchCross_player(props:{resetInputValue:any, handleSetProfil:any}) {
  const [inputValue, setInputValue] = useState("");
  const [display, setDisplay] = useState(false);
  const players = usePlayersContext();

  useEffect(() => { 
    return () => {setInputValue('')};
  },[props.resetInputValue])

  // Lorsqu'un clic autre part que sur l'input on le cache
  document.addEventListener("click", function (e:any) {
    if (e.target.id !== 'proposition_player--SearchCross'){
      document.getElementById('proposition_player--SearchCross--select')?.classList.add("hidden");
    }
  });
  
  // Lorsqu'un clic sur input on affiche
  const handleClickInput = () => { 
    if (inputValue !== '') {  document.getElementById('proposition_player--SearchCross--select')?.classList.remove('hidden') }
    else { document.getElementById('proposition_player--SearchCross--select')?.classList.add('hidden') }
  }

    // onInput si value est vide on cache sinon on affiche
  const handleOnChange = (event: any) => {
    setInputValue(event.target.value);
    if (event.target.value != ''){ document.getElementById('proposition_player--SearchCross--select')?.classList.remove('hidden'); setDisplay(true); }
    else{ document.getElementById('proposition_player--SearchCross--select')?.classList.add('hidden'); setDisplay(false) }
  };

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
      .then((res) => {return props.handleSetProfil(res)});
      setInputValue(player.player_nom + ' ' + player.player_prenom)
      document.getElementById('proposition_player--SearchCross--select')?.classList.add('hidden');
      setDisplay(false)
  }

  return (
    <>
      <label className="content-box__search--cross-search--name">
        <p>Nom du Joueur</p>
        <input
          id="proposition_player--SearchCross"
          className="input form-control input--profil"
          type="text"
          placeholder="Nom d'un joueur..."
          value={inputValue}
          onClick={() => handleClickInput()}
          onChange={(event) => handleOnChange(event)}
        />
        {display && (
          <div className="proposition_player--searchCross hidden"
            id="proposition_player--SearchCross--select">
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
      </label>
    </>
  );
}

export default SearchCross_player;
