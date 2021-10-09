import {createContext, useContext} from 'react'; 
import Player from '../classes/player';
import usePool from '../hooks/SearchPlayer/usePool';

export type Players = {
    players:Player[]
}

export const PlayersContext = createContext<Players>({
    players:[]
})

export const usePlayersContext = () => useContext(PlayersContext);