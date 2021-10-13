import React from 'react';
import {__match} from '../../classes/match';
import {__profil} from '../../classes/profil';
import {__infosMatch} from '../../classes/match';
import Match from '../../classes/match';
import Profil from '../../classes/profil';
import { useHistory } from 'react-router-dom';
import {HandleClickProfile} from '../utils/HandleClickProfile';
import {HandleClickYear} from '../utils/handleClickYear';
import Player from '../../classes/player';
import { usePlayersContext } from '../../contex/PlayersContext';

/**
* Renvoi les Matchs de la page profile
* @param { __matchs[] } matchList : tous les matchs 
* @param { Profil } joueur : le profil du joueur
* @return {JSX.Element} 
*/
function SearchProfile_matchs(props:{matchList:__match[], joueur:Profil}):any {
    const history = useHistory();
    const players = usePlayersContext();
     /**
     * Push la page searchYear après clic sur joueur
     * @param { String } direction
     */

    return (
        <>
            <div className="content__player content__player--match-list">
                <div className="button button__player button__player--match-list">LISTE DES MATCHS</div>
            </div>
            {/* <div className="content__player content__player--sum">
                <div className="button button__player button__player--sum">{props.joueur.nom_joueur} {props.joueur.prenom_joueur}</div>
                <div className="button button__player button__player--sum">{props.joueur.matchs.length} matchs ({props.joueur.nb_win}V / {props.joueur.nb_loose}D)</div>
            </div> */}
            <div className="content__player grid__search-player content__player--info">
                <div className="button button__player button__player--info">Adversaire</div>
                <div className="button button__player button__player--info">Editions</div>
                <div className="button button__player button__player--info">Tour</div>
                <div className="button button__player button__player--info">Score</div>
                {/* <img className='filter' src={require('../../resources/Search-Player/filter.svg').default} /> */}
            </div>

            {/* On map tous les matchs */}
            {props.matchList.map((matchs,index) => { 
                let match:Match = new Match(matchs);
                let vainq = {nom:'', prenom:'', nat:'', id:0};;
                let loose = {nom:'', prenom:'', nat:'', id:0};
                let idj1; 
                let idj2; 
                let score;
                {/* Si c'est une win on renvoit les infos du perdant  */}
                if (match.VAINQ === props.joueur.id_joueur){
                    // Si le joueur est IDJ1 on retourne idj2
                    if (match.VAINQ === match.IDJ1){ 
                        // on mappe tous les joueurs
                        players.players.map((player, index) => { 
                            // si l'id est pareil que idj2
                            if (player.player_id === match.IDJ2){
                                // loose = infos du player
                                loose = {nom: player.player_nom, prenom:player.player_prenom, id:player.player_id, nat: player.player_nat}
                                score = match.score_sorted.idj1;
                            }
                        })
                    }
                    // Si le joueur est IDJ2 on renvoit idj1
                    else if (match.VAINQ === match.IDJ2){ 
                        // on mappe tous les joueurs
                        players.players.map((player, index) => { 
                            // si l'id est pareil que idj1
                            if (player.player_id === match.IDJ1){
                                // loose = infos du player
                                loose = {nom: player.player_nom, prenom:player.player_prenom, id:player.player_id, nat: player.player_nat}
                                score = match.score_sorted.idj2;
                            }
                        })
                    }
                    return(
                        <div className="content__player grid__search-player content__player--info content__player--match content__player-match--win">
                            <div className="button__player--match" style={{cursor:'pointer'}} onClick={() => {HandleClickProfile(history, loose)}}>
                            <img className="matchs_flag" src={require('../../resources/flags/'+loose.nat+'.png').default} alt="" />
                                {loose.nom} {loose.prenom}</div>
                            <div className="button__player--match" onClick={() => HandleClickYear(history, match.annee)} style={{cursor:'pointer'}}>{match.annee}</div>
                            <div className="button__player--match">{match.tourString}</div>
                            <div className="button__player--match">{score}</div>
                        </div>
                    )
  
                }


                // if (match.infos_vainq.id === props.joueur.id_joueur){
                //     return(
                //         <div className="content__player grid__search-player content__player--info content__player--match content__player-match--win">
                //             <div className="button__player--match" style={{cursor:'pointer'}} onClick={() => {HandleClickProfile(history, match.infos_looser, players.players)}}>
                //             <img className="matchs_flag" src={require('../../resources/flags/'+match.infos_looser.nat+'.png').default} alt="" />
                //                 {match.infos_looser.nom} {match.infos_looser.prenom}</div>
                //             <div className="button__player--match" onClick={() => HandleClickYear(history, match.annee)} style={{cursor:'pointer'}}>{match.annee}</div>
                //             <div className="button__player--match">{match.tourString}</div>
                //             <div className="button__player--match">{match.infos_vainq.score}</div>
                //         </div>
                //     )
                // }

                {/* Sinon les infos du vainqueur  */}
                 // Si le joueur est IDJ2 on renvoit idj1
                 if (match.VAINQ === match.IDJ1){ 
                    // on mappe tous les joueurs
                    players.players.map((player, index) => { 
                        // si l'id est pareil que idj1
                        if (player.player_id === match.IDJ1){
                            // loose = infos du player
                            vainq = {nom: player.player_nom, prenom:player.player_prenom, id:player.player_id, nat: player.player_nat}
                            score = match.score_sorted.idj1;
                        }
                    })
                }
                // Si le joueur est IDJ1 on renvoit idj2
                else if (match.VAINQ === match.IDJ2){ 
                    // on mappe tous les joueurs
                    players.players.map((player, index) => { 
                        // si l'id est pareil que idj1
                        if (player.player_id === match.IDJ2){
                            // loose = infos du player
                            vainq = {nom: player.player_nom, prenom:player.player_prenom, id:player.player_id, nat: player.player_nat}
                            score = match.score_sorted.idj2;
                        }
                    })
                }
                return (
                    <div className="content__player grid__search-player content__player--info content__player--match content__player-match--loose">
                        <div className="button__player--match" style={{cursor:'pointer'}} onClick={() => {HandleClickProfile(history, vainq)}}>
                            <img className="matchs_flag" src={require('../../resources/flags/'+vainq.nat+'.png').default} alt="" />
                                {vainq.nom} {vainq.prenom}</div>
                            <div className="button__player--match" onClick={() => HandleClickYear(history, match.annee)} style={{cursor:'pointer'}}>{match.annee}</div>
                            <div className="button__player--match">{match.tourString}</div>
                        <div className="button__player--match">{score}</div>
                    </div>
                )
            })}
        </>
    )
}

export default SearchProfile_matchs