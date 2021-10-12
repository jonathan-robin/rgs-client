import Player from "../../classes/player";
import { usePlayersContext } from "../../contex/PlayersContext";

export function HandleClickProfile(history: any, joueur:any, players:Player[]):void{
    
    fetch("https://rgstatsapi.herokuapp.com/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nom: joueur.nom,
        prenom: joueur.prenom,
        id: joueur.id,
        nat: joueur.nat,
        players:players
      }),
    })
      .then((res) => res.json())
      .then((res) =>
         history.push({ pathname: "/searchProfile", state: { profil: res, } })
      );
  }
