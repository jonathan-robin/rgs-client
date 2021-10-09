import react, {useState, useEffect} from 'react';
import {__player} from '../../classes/interface/__player';
import Player from '../../classes/player';
/**
* Retourne la liste des joueurs dans une liste déroulante
* @returns { __player[] } players : le pool des joueurs
*/
export default function usePool():Player[]{
    const players:Player[] = [];

    useEffect(() => { 
        fetch('https://rgstatsapi.herokuapp.com/players', {
            method:'GET', 
        })
        .then((res) => res.json())
        .then((res) => {return res.map((element:__player) => {
                players.push(new Player(element))
        });
        }
            )
    },[])

    return players;
} 
