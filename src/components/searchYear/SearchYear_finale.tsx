import react, {useState, useEffect, useRef} from 'react';
import {__draw} from '../../interface/__draw';
import {__match} from '../../interface/__match';
import {__profil} from '../../interface/__profil';
import {__player} from '../../interface/__player';
import {__resultatMatch} from '../../interface/__resultatMatch';
import {__scoreSorted} from '../../interface/__scoreSorted';
import Match from '../../classes/match';
import {HandleClickProfile} from '../utils/HandleClickProfile';
import {HandleClickYear} from '../utils/handleClickYear';
import { useHistory } from 'react-router';
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
                <span className="bubble bubble__search-year--result">
                <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+infoDemi_a?.infos_vainq.nat+'.png').default} />
                  <div className="resultat__match--name" onClick={()=>HandleClickProfile(history, infoDemi_a?.infos_vainq)} style={{cursor:'pointer'}}>{infoDemi_a?.infos_vainq.nom} {infoDemi_a?.infos_vainq.prenom} </div>
                  </div>
                  <div className="row resultat__match--score">{infoDemi_a?.infos_vainq.score}</div>
                </span>
              </div>
        {/* <-- Fin Résultat finale*/}
        {/* --> Début Résultat Demi-finale*/}
              <div className="row resultat__match--down">
                <span className="bubble bubble__search-year--result">
                <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+infoDemi_b?.infos_vainq.nat+'.png').default} />
                  <div className="resultat__match--name" onClick={()=>HandleClickProfile(history, infoDemi_b?.infos_vainq)} style={{cursor:'pointer'}}>{infoDemi_b?.infos_vainq.nom} {infoDemi_b?.infos_vainq.prenom} </div>
                  </div>
                  <div className="row resultat__match--score">{infoDemi_b?.infos_vainq.score}</div>
                </span>
              </div>
            </div>
            <div className="col resultat__match">
              <div className="row resultat__match--middle">
                <span className="bubble bubble__search-year--result">
                <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+finale.infos_vainq.nat+'.png').default} />
                  <div className="resultat__match--name" onClick={()=>HandleClickProfile(history, finale.infos_vainq)} style={{cursor:'pointer'}}>{finale.infos_vainq.nom} {finale.infos_vainq.prenom}</div>
                  </div>
                  <div className="row resultat__match--score">{finale.infos_vainq.score}</div>
                </span>
              </div>
            </div>
        </div>
        {/* --> Début Résultat Demi-finale*/}
        </div>
    )
}

export default SearchYear_finale
