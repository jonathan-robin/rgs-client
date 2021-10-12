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
                        if (match.VAINQ === match.IDJ1) { 
                            players.players.map((player, index) => {
                                if(player.player_id === match.VAINQ){
                                    idj1 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}
                                }
                                else if(player.player_id === match.IDJ2){
                                    idj2 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}
                                }
                            })
                        }
                        else{
                            players.players.map((player, index) => {
                                if(player.player_id === match.VAINQ){
                                    idj2 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}
                                }
                                else if(player.player_id === match.IDJ1){
                                    idj1 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}
                                }
                            })
                        }
                        return (
                            <>
                            <div className='div200'>
                            <div className='row'>
                                <span className="bubble bubble__search-year--result">
                                <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+idj1.nat+'.png').default} />
                                    <div className="resultat__match--name resultat__match--name--first-round" style={{cursor:'pointer'}}
                                    onClick={() => {HandleClickProfile(history, idj1, players.players)}} >{idj1.nom} {idj1.prenom}
                                    </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className='div200'>
                        <div className='row'>
                          <span className="bubble bubble__search-year--result">
                          <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+idj2.nat+'.png').default} />
                            <div className="resultat__match--name resultat__match--name--first-round" style={{cursor:'pointer'}}
                             onClick={() => {HandleClickProfile(history, idj2, players.players)}}>{idj2.nom} {idj2.prenom}
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
                        let idj1 = {nom:'', prenom:'', nat:'',id:0}; 
                        let idj2 = {nom:'', prenom:'', nat:'',id:0};
                        let vainq = {nom:'', prenom:'', nat:'',id:0};
                        let score;
                        players.players.map((player, index) => {
                            if (player.player_id === match.IDJ1){idj1 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}}
                            else if(player.player_id === match.IDJ2){ idj2 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                        })
                        if (match.VAINQ === match.IDJ1){ vainq = idj1; score = match.score_sorted.idj1; }
                        else{ vainq= idj2; score = match.score_sorted.idj2;}
                        return(
                    <div className='div200'>
                        <div className='row'>
                            <span className="bubble bubble__search-year--result">
                            <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} />
                                <div className="resultat__match--name" style={{cursor:'pointer'}}
                                onClick={() => HandleClickProfile(history, vainq, players.players)}>{vainq.nom} {vainq.prenom}
                                </div></div>
                                <div><div className="row resultat__match--score">{score}</div></div>
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
                            let idj1 = {nom:'', prenom:'', nat:'',id:0}; 
                            let idj2 = {nom:'', prenom:'', nat:'',id:0};
                            let vainq = {nom:'', prenom:'', nat:'',id:0};
                            let score;
                            players.players.map((player, index) => {
                                if (player.player_id === match.IDJ1){idj1 = {nom: player.player_nom, prenom: player.player_prenom, nat:player.player_nat, id:player.player_id}}
                                else if(player.player_id === match.IDJ2){ idj2 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                            })
                            if (match.VAINQ === match.IDJ1){ vainq = idj1; score = match.score_sorted.idj1; }
                            else{ vainq= idj2; score = match.score_sorted.idj2;}
                        return(
                        <div className='div200'>
                            <div className='row'>
                                <span className="bubble bubble__search-year--result">
                            <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, vainq, players.players)}>{vainq.nom} {vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{score}</div>
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
                             let idj1 = {nom:'', prenom:'', nat:'',id:0}; 
                             let idj2 = {nom:'', prenom:'', nat:'',id:0};
                             let vainq = {nom:'', prenom:'', nat:'',id:0};
                             let score;
                             players.players.map((player, index) => {
                                 if (player.player_id === match.IDJ1){idj1 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                                 else if(player.player_id === match.IDJ2){ idj2 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                             })
                             if (match.VAINQ === match.IDJ1){ vainq = idj1; score = match.score_sorted.idj1; }
                             else{ vainq= idj2; score = match.score_sorted.idj2;}
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, vainq, players.players)}>{vainq.nom} {match.infos_vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{score}</div>
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
                             let idj1 = {nom:'', prenom:'', nat:'',id:0}; 
                             let idj2 = {nom:'', prenom:'', nat:'',id:0};
                             let vainq = {nom:'', prenom:'', nat:'',id:0};
                             let score;
                             players.players.map((player, index) => {
                                 if (player.player_id === match.IDJ1){idj1 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                                 else if(player.player_id === match.IDJ2){ idj2 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                             })
                             if (match.VAINQ === match.IDJ1){ vainq = idj1; score = match.score_sorted.idj1; }
                             else{ vainq= idj2; score = match.score_sorted.idj2;}
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, vainq, players.players)}>{vainq.nom} {vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{score}</div>
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
                              let idj1 = {nom:'', prenom:'', nat:'',id:0}; 
                              let idj2 = {nom:'', prenom:'', nat:'',id:0};
                              let vainq = {nom:'', prenom:'', nat:'',id:0};
                              let score;
                              players.players.map((player, index) => {
                                  if (player.player_id === match.IDJ1){idj1 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                                  else if(player.player_id === match.IDJ2){ idj2 = {nom: player.player_prenom, prenom: player.player_nom, nat:player.player_nat, id:player.player_id}}
                              })
                              if (match.VAINQ === match.IDJ1){ vainq = idj1; score = match.score_sorted.idj1; }
                              else{ vainq= idj2; score = match.score_sorted.idj2;}
                            return(
                            <div className='div200'>
                                <div className='row'>
                                    <span className="bubble bubble__search-year--result">
                                    <div style={{display:'flex'}}><img className="draw__flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} />
                                    <div className="resultat__match--name" style={{cursor:'pointer'}}
                                    onClick={() => HandleClickProfile(history, vainq, players.players)}>{vainq.nom} {vainq.prenom}
                                    </div>
                                    </div>
                                    <div className="row resultat__match--score">{score}</div>
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
