import React,{useState, useEffect} from "react";
import usePool from "../../hooks/SearchPlayer/usePool";
import FetchSearchCross from "../utils/FetchSearchCross";
import Player from "../../classes/player";
import Profil from '../../classes/profil';
import SearchCross_player from "../SearchCross/SearchCross_player";
import SearchCross_tour from "../SearchCross/SearchCross_tour";
import SearchCross_year from '../SearchCross/SearchCross_year'; 
import SearchCross_results from '../../pages/searchCross/index';
import Match from "../../classes/match";
import { __match } from "../../classes/match";

 function SearchCross_search(props:{players:Player[]}) {
    const [profil, setProfil] = useState<Profil | null>(null);
    const [tour, setTour] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [result, setResult] = useState<Match[] | null>(null);
    const [reset, setReset] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => { 
    tour != undefined && handleSetTour(tour); 
    year != undefined && handleSetYear(year)
  },[profil])

  useEffect(() => {
    if ((!Number.isInteger(tour) && !Number.isInteger(year)) && profil){ 
      setResult(profil.matchs.map((match:__match,index:number) => {
        return new Match(match)
      }))
    }
  },[tour, year])

    const handleSetProfil = (profil:Profil) => {
      setProfil(profil);
      setResult(profil.matchs.map((match:__match,index:number) => {
        return new Match(match)
      }))
      setDisabled(false);
     }

     const handleClickReset = () => {
       setProfil(null); 
       setTour(null); 
       setYear(null); 
       setResult(null);
       setReset(true);
       setDisabled(true);
     }

    const handleSetTour = (tour:number) => {
      setTour(tour);
      fetch('https://rgstatsapi.herokuapp.com/cross', {
          method:'POST',
          headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
          body: JSON.stringify({tour:tour, 
              year, id_joueur: profil?.id_joueur}),
      })
      .then(res => res.json())
      .then((res) => {return setResult(res.map((match:__match,index:number) => {
        return new Match(match)}))})
    }

    const handleSetYear = (year:number) => {
        setYear(year);
        fetch('https://rgstatsapi.herokuapp.com/cross', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({tour, 
                year:year, id_joueur: profil?.id_joueur}),
        })
        .then(res => res.json())
        .then((res) => {return setResult(res.map((match:__match,index:number) => {
          return new Match(match)}))})
    }

  return (
    <>
    <div className='outer-cross'>
      <div className="content-box content-box--cross-search col-12">
        <div className="content-box__text">
          <div className="sub-title sub-title--cross-search">
            Recherche croisee
          </div>
          <div className="sub-title--lighter">
            Vous voulez pousser encore plus loin ?
          </div>
          <div className="text-regular">
            Sur les champs de recherche qui suivent, vous pourrez faire des
            recherches plus précises !
          </div>
          <div className="text-regular text-regular__new">
            Vous êtes surs que Guga a disputé l'édition 2001 ? Rien de plus
            facile, rentrez son nom dans le champ "Nom du joueur", l'année dans
            le champ "année", cliquez sur rechercher et vous aurez accès à tous
            les matchs du joueur lors de cette édition. Les résultats sont
            affichés sous les filtrés en temps réel lorsque vous avez modifié
            les champs.
          </div>
          <div className="text-regular text-regular__new">
            Vous souhaitez retrouver le score de la finale de 2016 ? Rentrez
            "2016" dans le champ année et "Finale" dans le champ Tour.
          </div>
          <div className="text-regular text-regular__new">
            Vous voulez avoir accès à toutes les finales de Rafa, rentrez son
            nom dans le champ "Nom du joueur" et "Finale" dans le champ tour !
          </div>
        </div>
      </div>

      <div className='input-group'> 
        <div className="content-box__search content-box__search--cross-search col">
            <SearchCross_player resetInputValue={reset} handleSetProfil={handleSetProfil} players={props.players}/>
            <SearchCross_year disabled={disabled} resetInputValue={reset} handleSetYear={handleSetYear} />
            </div>
        <div className="content-box__search content-box__search--cross-search col">
            <SearchCross_tour disabled={disabled} resetInputValue={reset} handleSetTour={handleSetTour} />
            <button type="button" className="button button__search--cross-search" onClick={handleClickReset}>Réinitialiser les filtres</button>
        </div>

      </div>
    </div>
    {profil && <SearchCross_results result={result} profil={profil} tour={tour} year={year}/>
    }
    </>
  );
}

export default SearchCross_search;
