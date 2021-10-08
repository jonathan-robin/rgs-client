import React from 'react';
import {__match} from '../../classes/match';
import {__profil} from '../../classes/profil';
import {__infosMatch} from '../../classes/match';
import Match from '../../classes/match';
import Profil from '../../classes/profil';
import { useHistory } from 'react-router-dom';
import {HandleClickProfile} from '../utils/HandleClickProfile';
import {HandleClickYear} from '../utils/handleClickYear';

/**
* Renvoi les Matchs de la page profile
* @param { __matchs[] } matchList : tous les matchs 
* @param { Profil } joueur : le profil du joueur
* @return {JSX.Element} 
*/
function SearchProfile_matchs(props:{matchList:__match[], joueur:Profil}):any {
    const history = useHistory();

     /**
     * Push la page searchYear après clic sur joueur
     * @param { String } direction
     */

    // const handleClickYear = (year:number) => { 
    //     history.push({pathname:'/searchYear', state:{year:year}})
    // }

    return (
        <>
            <div className="content__player content__player--match-list">
                <div className="button button__player button__player--match-list">LISTE DES MATCHS</div>
            </div>
            <div className="content__player content__player--sum">
                <div className="button button__player button__player--sum">{props.joueur.nom_joueur} {props.joueur.prenom_joueur}</div>
                <div className="button button__player button__player--sum">{props.joueur.matchs.length} matchs ({props.joueur.nb_win}V / {props.joueur.nb_loose}D)</div>
            </div>
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
                {/* Si c'est une win on renvoit les infos du perdant  */}
                if (match.infos_vainq.id === props.joueur.id_joueur){
                    return(
                        <div className="content__player grid__search-player content__player--info content__player--match content__player-match--win">
                            <div className="button__player--match" style={{cursor:'pointer'}} onClick={() => {HandleClickProfile(history, match.infos_looser)}}>
                            <img className="matchs_flag" src={require('../../resources/flags/'+match.infos_looser.nat+'.png').default} alt="" />
                                {match.infos_looser.nom} {match.infos_looser.prenom}</div>
                            <div className="button__player--match" onClick={() => HandleClickYear(history, match.annee)} style={{cursor:'pointer'}}>{match.annee}</div>
                            <div className="button__player--match">{match.tourString}</div>
                            <div className="button__player--match">{match.infos_vainq.score}</div>
                        </div>
                    )
                }
                {/* Sinon les infos du vainqueur  */}
                return (
                    <div className="content__player grid__search-player content__player--info content__player--match content__player-match--loose">
                        <div className="button__player--match" style={{cursor:'pointer'}} onClick={() => {HandleClickProfile(history, match.infos_vainq)}}>
                            <img className="matchs_flag" src={require('../../resources/flags/'+match.infos_vainq.nat+'.png').default} alt="" />
                                {match.infos_vainq.nom} {match.infos_vainq.prenom}</div>
                            <div className="button__player--match" onClick={() => HandleClickYear(history, match.annee)} style={{cursor:'pointer'}}>{match.annee}</div>
                            <div className="button__player--match">{match.tourString}</div>
                        <div className="button__player--match">{match.infos_vainq.score}</div>
                    </div>
                )
            })}
        </>
    )
}

export default SearchProfile_matchs