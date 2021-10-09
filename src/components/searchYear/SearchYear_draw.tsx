import React,{useState, useEffect, useRef} from 'react'; 
import {__draw} from '../../classes/interface/__draw';
import Match, { __infosMatch } from '../../classes/match';
import {__match} from '../../classes/interface/__match';
import {HandleClickProfile} from '../utils/HandleClickProfile';
import { useHistory } from 'react-router';
import SearchProfile_matchs from '../searchProfile/SearchProfile_matchs';
import Player from '../../classes/player';
import { usePlayersContext } from '../../contex/PlayersContext';

/**
* Renvoi les tours 1 à 6 pour recherche par édition
* @param { number } year : l'année rentrée dans l'input 
* @param { draw } draw : le tableau des tours 1 à 7
* @return {JSX.Element} 
*/
function SearchYear_draw(props:{year:number, draw:__draw}):JSX.Element{
    const lesTours:any[] = [];
    const history = useHistory();
    const players = usePlayersContext();

    // On transforme l'objet draw en array en instanciant chaque match
    for (const [key, value] of Object.entries(props.draw)) {
        lesTours.push((value.map((match:__match,index:number) => {
            return new Match(match)
        })))
      }

console.log(props.draw)

    return (
        <div className="background__search-year">
            <div className='row rowsearch'>
                <div className="col-2 premier">
                    <div className='div200 tour'>
                        <div className="row">
                            <div className="col">
                                <span className="bubble bubble__search-year__info--tour">1er tour</span>
                            </div>
                        </div>
                    </div>

                    {/* On mappe les premiers tours et on les affiche 1 match = 2 items  */}
                    {lesTours[0].map((match:Match, index:number) => {
                        // let infos_vainq:__infosMatch = {nom: match.nom}
                        var idj1:any;
                        var idj2:any;
                        // On récupère les infos de j1 et j2 pour renvoyer vers le profil au handleClick
                        if (match.match.VAINQ === match.match.IDJ1) { 
                            idj2 = match.infos_looser; 
                            idj1 = match.infos_vainq; 
                        }
                        else{
                            idj1 = match.infos_vainq; 
                            idj2 = match.infos_looser;
                        }
                        // match.match.VAINQ === match.match.IDJ1 ? () => {idj2 = match.infos_looser; idj1 = match.infos_vainq} : () => {idj1 = match.infos_looser; idj2 = match.infos_vainq}
                        console.log(match);
                        return (
                            <>
                            <div className='div200'>
                            <div className='row'>
                                <span className="bubble bubble__search-year--result">
                                <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.nat_idj1+'.png').default} />
                                    <div className="resultat__match--name resultat__match--name--first-round" style={{cursor:'pointer'}}
                                    onClick={() => {HandleClickProfile(history, idj1, players.players)}} >{match.fullName_idj1} 
                                    </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className='div200'>
                        <div className='row'>
                          <span className="bubble bubble__search-year--result">
                          <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.nat_idj2+'.png').default} />
                            <div className="resultat__match--name resultat__match--name--first-round" style={{cursor:'pointer'}}
                             onClick={() => {HandleClickProfile(history, idj2, players.players)}}>{match.fullName_idj2}
                            </div>
                            </div>
                          </span>
                        </div>
                      </div>
                      </>
                        )
                    })}                
                </div>

                <div className="col-2 second">
                    <div className='div200 tour'>
                        <div className="row">
                            <div className="col">
                                <span className="bubble bubble__search-year__info--tour">2nd tour</span>
                            </div>
                        </div>
                    </div>

                    {/* On mappe les tours 1, on affiche un item avec les infos du vainq  */}
                    {lesTours[0].map((match:Match, index:number) => {
                        return(
                    <div className='div200'>
                        <div className='row'>
                            <span className="bubble bubble__search-year--result">
                            <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} />
                                <div className="resultat__match--name" style={{cursor:'pointer'}}
                                onClick={() => HandleClickProfile(history, match.infos_vainq, players.players)}>{match.infos_vainq.nom} {match.infos_vainq.prenom}
                                </div></div>
                                <div><div className="row resultat__match--score">{match.infos_vainq.score}</div></div>
                            </span>
                        </div>
                    </div>
                    )})}
                </div>
  
                    <div className="col-2 troisieme">
                        <div className='div200 tour'>
                            <div className="row">
                                <div className="col">
                                    <span className="bubble bubble__search-year__info--tour">3e tour</span>
                                </div>
                            </div>
                        </div>

                        {/* On mappe les tours 2 on affiche un item avec les infos du vainq */}
                        {lesTours[1].map((match:Match, index:number) => {
                        return(
                        <div className='div200'>
                            <div className='row'>
                                <span className="bubble bubble__search-year--result">
                            <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, match.infos_vainq, players.players)}>{match.infos_vainq.nom} {match.infos_vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{match.infos_vainq.score}</div>
                                </span>
                            </div>
                        </div>
                         )})}
                    </div>

                    <div className="col-2 huitieme">
                        <div className='div200 tour'>
                            <div className="col">
                                <span className="bubble bubble__search-year__info--tour">HUITIEME</span>
                            </div>
                        </div>

                        {/* etc... */}
                        {lesTours[2].map((match:Match, index:number) => {
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, match.infos_vainq, players.players)}>{match.infos_vainq.nom} {match.infos_vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{match.infos_vainq.score}</div>
                                    </span>
                                </div>
                            </div>
                        )})}
                    </div>
             
                    <div className="col-2 quart">
                    <div className='div200 tour'>
                            <div className="col">
                                <span className="bubble bubble__search-year__info--tour">Quart</span>
                            </div>
                        </div>

                        {lesTours[3].map((match:Match, index:number) => {
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, match.infos_vainq, players.players)}>{match.infos_vainq.nom} {match.infos_vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{match.infos_vainq.score}</div>
                                    </span>
                                </div>
                            </div>
                        )})}
                    </div>
              
                    <div className="col-2 demi">
                    <div className='div200 tour'>
                            <div className="col">
                                <span className="bubble bubble__search-year__info--tour">Demi</span>
                            </div>
                        </div>
                        
                        {lesTours[4].map((match:Match, index:number) => {
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, match.infos_vainq, players.players)}>{match.infos_vainq.nom} {match.infos_vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{match.infos_vainq.score}</div>
                                    </span>
                                </div>
                            </div>
                        )})}
                    </div>
            </div>
        </div>
    )
}

export default SearchYear_draw
