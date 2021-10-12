import React,{useEffect} from "react";
import Profil from "../../classes/profil";
import tourToString from "../../components/utils/tourToString";
import Match from "../../classes/match";
import { __match } from "../../classes/match";
import {HandleClickYear} from "../../components/utils/handleClickYear";
import {HandleClickProfile} from "../../components/utils/HandleClickProfile";
import { useHistory } from "react-router";
import Player from "../../classes/player";
import { usePlayersContext } from "../../contex/PlayersContext";
import { createNoSubstitutionTemplateLiteral } from "typescript";

function SearchCross_results(props:{result:Match[] | null, profil:Profil, tour:number|null, year: number|null}):JSX.Element {

  const history = useHistory();
  const players = usePlayersContext();

  return (
    <div className="row modal__cross-search">
      <div className="row modal__filter--cross-search">
        <div
          id="modal__filter--cross-search--nom"
          className="col modal__filter--cross-search--nom"
        >
          <p>{props.profil.nom_joueur} {props.profil.prenom_joueur}</p>
        </div>
        <div
          id="modal__filter--cross-search--tour"
          className="col modal__filter--cross-search--nom"
        > 
          <p>{props.tour === null ? 'Tous les tours':tourToString(props.tour)}</p>
        </div>
        <div
          id="modal__filter--cross-search--year"
          className="col modal__filter--cross-search--year"
        >
          <p>{props.year === null ? 'Toutes Editions' : props.year}</p>
        </div>
      </div>

      <div className="col modal__matchList--cross-search">

        {props.result?.map((res, index) => { 
          let loose = {nom:'',prenom:'', nat:'', id:0};
          let vainq = {nom:'',prenom:'', nat:'', id:0};
          let score;
          // Si c'est une victoire 
          if (res.VAINQ === props.profil.id_joueur){ 
            // Si le joueur est idj1 on retourne les infos d'idj2 avec le score_sorted d'idj2
            if (res.VAINQ === res.IDJ1){
              // On map tous les joueurs
              players.players.map((player, index) => {
                // On retourne les infos de idj2
                if (player.player_id === res.IDJ2){
                  loose = {nom:player.player_nom, prenom:player.player_prenom, nat:player.player_nat, id:player.player_id};
                  score = res.score_sorted.idj1
                }
              }) 
            }
            // sinon on retourne les infos d'idj1
            else{
              players.players.map((player, index) => {
                console.log(player.player_nom)
                if (player.player_id === res.IDJ1){
                  loose = {nom:player.player_nom, prenom:player.player_prenom, nat:player.player_nat, id:player.player_id};
                  score = res.score_sorted.idj2;
                }
              })
            }
            // Sinon on retourne les infos de idj2

              return (
                <div className="row modal__match--cross-search modal__match--cross-search--win">
                    <img className="matchs_flag--searchCross" src={require('../../resources/flags/'+loose.nat+'.png').default} alt="" />
                    <div className="col modal__match--cross-search--name" onClick={() => HandleClickProfile(history, loose)} style={{cursor:'pointer'}}>{loose.nom} {loose.prenom} </div>
                    <div className="col modal__match--cross-search--year" onClick={() => HandleClickYear(history, res.annee)} style={{cursor:'pointer'}}>{res.annee}</div>
                    <div className="col modal__match--cross-search--tour">{res.tourString}</div>
                    <div className="col modal__match--cross-search--score">
                        {score}
                    </div>
                </div> 
            )
          }

                // if (res.infos_vainq.id === props.profil.id_joueur){
                //     return (
                //         <div className="row modal__match--cross-search modal__match--cross-search--win">
                //             <div className="col modal__match--cross-search--name" onClick={() => HandleClickProfile(history, res.infos_looser)} style={{cursor:'pointer'}}>
                //                 {res.infos_looser.nom} {res.infos_looser.prenom} 
                //             </div>
                //             <div className="col modal__match--cross-search--year" onClick={() => HandleClickYear(history, res.annee)} style={{cursor:'pointer'}}>{res.annee}</div>
                //             <div className="col modal__match--cross-search--tour">{res.tourString}</div>
                //             <div className="col modal__match--cross-search--score">
                //                 {res.infos_vainq.score}
                //             </div>
                //         </div> 
                //     )
                // }

                // Si c'est une défaite
                  // Si le vainq est idj1
                if (res.VAINQ === res.IDJ1){
                  // On map tous les joueurs
                  players.players.map((player, index) => {
                    // On retourne les infos de idj2
                    if (player.player_id === res.IDJ1){
                      vainq = {nom:player.player_nom, prenom:player.player_prenom, nat:player.player_nat, id:player.player_id};
                      score = res.score_sorted.idj1
                    }
                  }) 
                }
                // sinon on retourne les infos d'idj2
                else{
                  players.players.map((player, index) => {
                    if (player.player_id === res.IDJ2){
                      vainq = {nom:player.player_nom, prenom:player.player_prenom, nat:player.player_nat, id:player.player_id};
                      score = res.score_sorted.idj2;
                    }
                  })
                }
                return (
                    <div className="row modal__match--cross-search modal__match--cross-search--loose">
                      <img className="matchs_flag--searchCross" src={require('../../resources/flags/'+vainq.nat+'.png').default} alt="" />
                        <div className="col modal__match--cross-search--name" onClick={() => HandleClickProfile(history, vainq)} style={{cursor:'pointer'}}>{vainq.nom} {vainq.prenom}</div>
                        <div className="col modal__match--cross-search--year" onClick={() => HandleClickYear(history, res.annee)} style={{cursor:'pointer'}}>{res.annee}</div>
                        <div className="col modal__match--cross-search--tour" >{res.tourString}</div>
                        <div className="col modal__match--cross-search--score">
                        {score}
                        </div>
                    </div>
                )
        })}
      </div>
    </div>  
   );
}

export default SearchCross_results;
