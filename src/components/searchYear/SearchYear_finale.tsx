import react, {useState, useEffect, useRef} from 'react';
import {__draw} from '../../classes/interface/__draw';
import {__match} from '../../classes/interface/__match';
import {__profil} from '../../classes/interface/__profil';
import {__player} from '../../classes/interface/__player';
import {__resultatMatch} from '../../classes/interface/__resultatMatch';
import {__scoreSorted} from '../../classes/interface/__scoreSorted';
import Match from '../../classes/match';
import {HandleClickProfile} from '../utils/HandleClickProfile';
import {HandleClickYear} from '../utils/handleClickYear';
import { useHistory } from 'react-router';
import Player from '../../classes/player';
import { usePlayersContext } from '../../contex/PlayersContext';
/**
* Renvoi les tours 6 et 7 
* @param { number } year : l'année rentrée dans l'input 
* @param { draw } draw : le tableau des tours 1 à 7
* @return {JSX.Element} 
*/
function SearchYear_finale(props:{year:number, draw:__draw}) {
  const finale = new Match(props.draw.tour7[0]);
  const infoDemi_a = new Match(props.draw.tour6[0]);
  const infoDemi_b = new Match(props.draw.tour6[1]);
  const history = useHistory();
  const players= usePlayersContext();

    return (
      <div>
        {/* --> Début Info-bulle finale*/}
        <div className="col-8 content-box--search-year--top bubble__search-year__info">
          <div className="row">
            <div className="col">
              <span className="bubble bubble__search-year__info--edition">{props.year}</span>
            </div>
            <div className="col">
              <span className="bubble bubble__search-year__info--tour">FINALE</span>
            </div>
          </div>
        </div>
        {/* <-- Fin Info-bulle finale*/}

        {/* --> Début Résultat finale*/}
        <div className="row resultat resultat__finale">
            <div className="col resultat__match">
              <div className="row resultat__match--up">

                  {players.players.map((player, index) => { 
                    if (infoDemi_a.VAINQ === player.player_id ){
                      return (
                        <span className="bubble bubble__search-year--result">
                          <div style={{display:'flex'}}>
                            <img className="draw__flag" src={require('../../resources/flags/'+player.player_nat+'.png').default} />
                            <div className="resultat__match--name" onClick={() => HandleClickProfile(history, {nom:player.player_nom, prenom:player.player_prenom, id:player.player_id, nat:player.player_nat})} style={{cursor:'pointer'}}>
                              {player.player_nom} {player.player_prenom}
                            </div>
                          </div>
                          <div className="row resultat__match--score">{player.player_id === infoDemi_a.IDJ1 ? infoDemi_a?.score_sorted.idj1 : infoDemi_a?.score_sorted.idj2}</div>
                        </span>
                      )
                    }
                  })}
              </div>
        {/* <-- Fin Résultat finale*/}
        {/* --> Début Résultat Demi-finale*/}
              <div className="row resultat__match--down">
              {players.players.map((player, index) => { 
                if (infoDemi_b.VAINQ === player.player_id ){
                  return (
                    <span className="bubble bubble__search-year--result">
                      <div style={{display:'flex'}}>
                        <img className="draw__flag" src={require('../../resources/flags/'+player.player_nat+'.png').default} />
                        <div className="resultat__match--name" onClick={()=>HandleClickProfile(history, {nom:player.player_nom, prenom:player.player_prenom, id:player.player_id, nat:player.player_nat})} style={{cursor:'pointer'}}>
                          {player.player_nom} {player.player_prenom} 
                        </div>
                      </div>
                      <div className="row resultat__match--score">{player.player_id === infoDemi_b.IDJ1 ? infoDemi_b?.score_sorted.idj1 : infoDemi_b?.score_sorted.idj2}</div>
                    </span>
                  )
                }
              })}
              </div>

            </div>
            <div className="col resultat__match">
              <div className="row resultat__match--middle">
              {players.players.map((player, index) => { 
                if (finale.VAINQ === player.player_id ){
                  return (
                    <span className="bubble bubble__search-year--result">
                      <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+player.player_nat+'.png').default} />
                        <div className="resultat__match--name" onClick={()=>HandleClickProfile(history, {nom:player.player_nom, prenom:player.player_prenom, id:player.player_id, nat:player.player_nat})} style={{cursor:'pointer'}}>
                          {player.player_nom} {player.player_prenom}
                        </div>
                      </div>
                      <div className="row resultat__match--score">{player.player_id === finale.IDJ1 ? finale?.score_sorted.idj1 : finale?.score_sorted.idj2}</div>
                    </span>
                  )
                }
              })}
              </div>
            </div>
        </div>
        {/* --> Début Résultat Demi-finale*/}
        </div>
    )
}

export default SearchYear_finale
