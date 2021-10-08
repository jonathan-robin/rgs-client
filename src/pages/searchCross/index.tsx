import React,{useEffect} from "react";
import Profil from "../../classes/profil";
import tourToString from "../../components/utils/tourToString";
import Match from "../../classes/match";
import { __match } from "../../classes/match";
import {HandleClickYear} from "../../components/utils/handleClickYear";
import {HandleClickProfile} from "../../components/utils/HandleClickProfile";
import { useHistory } from "react-router";

function SearchCross_results(props:{result:Match[] | null, profil:Profil, tour:number|null, year: number|null}):JSX.Element {

  const history = useHistory();
  const handleClickProfil = (infos:any) => { 
    console.log(infos)
  }

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
          <p>{props.tour != undefined && props.tour != null && props.tour.toString() != 'unselected'? tourToString(props.tour) : 'Tous les tours'}</p>
        </div>
        <div
          id="modal__filter--cross-search--year"
          className="col modal__filter--cross-search--year"
        >
          <p>{props.year != undefined && props.year != null && props.year.toString() != 'undefined' ? props.year : 'Toutes Editions'}</p>
        </div>
      </div>

      <div className="col modal__matchList--cross-search">

        {props.result?.map((res, index) => { 
                if (res.infos_vainq.id === props.profil.id_joueur){
                    return (
                        <div className="row modal__match--cross-search modal__match--cross-search--win">
                            <div className="col modal__match--cross-search--name" onClick={() => HandleClickProfile(history, res.infos_looser)} style={{cursor:'pointer'}}>
                                {res.infos_looser.nom} {res.infos_looser.prenom} 
                            </div>
                            <div className="col modal__match--cross-search--year" onClick={() => HandleClickYear(history, res.annee)} style={{cursor:'pointer'}}>{res.annee}</div>
                            <div className="col modal__match--cross-search--tour">{res.tourString}</div>
                            <div className="col modal__match--cross-search--score">
                                {res.infos_vainq.score}
                            </div>
                        </div> 
                    )
                }
                return (
                    <div className="row modal__match--cross-search modal__match--cross-search--loose">
                        <div className="col modal__match--cross-search--name" onClick={() => HandleClickProfile(history, res.infos_vainq)} style={{cursor:'pointer'}}>
                        {res.infos_vainq.nom} {res.infos_vainq.prenom} 
                        </div>
                        <div className="col modal__match--cross-search--year" onClick={() => HandleClickYear(history, res.annee)} style={{cursor:'pointer'}}>{res.annee}</div>
                        <div className="col modal__match--cross-search--tour" >{res.tourString}</div>
                        <div className="col modal__match--cross-search--score">
                        {res.infos_vainq.score}
                        </div>
                    </div>
                )
        })}
      </div>
    </div>  
   );
}

export default SearchCross_results;
