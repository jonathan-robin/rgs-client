import react,{useEffect, useState} from 'react'; 
import {__draw} from '../../interface/__draw';
import {__match} from '../../interface/__match';
import {__profil} from '../../interface/__profil';
import { __player } from '../../interface/__player';
import {RouteComponentProps} from 'react-router-dom';
import SearchYear_Layout from '../../pages/SearchYear/index';

type year = {
    year:string
  };

/**
* Renvoi les tours 6 et 7 
* @param { year } year : L'année rentrée passé via le location.state du router 
* @return {JSX.Element} 
*/
function SearchYear(props: RouteComponentProps<{}, any, year | any>):JSX.Element {
    const [draw, setDraw] = useState<__draw>()

    // On fetch pour recevoir les infos à afficher et setDraw
    useEffect(() => { 
        fetch('https://rgstatsapi.herokuapp.com/year', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({'year':[props.location.state.year]}),
        })
        .then(response => response.json())
        .then(response => {return setDraw(response)})
    },[])

    // Quand setDraw != null on affiche searchYear
    return (draw != undefined && <><SearchYear_Layout year={props.location.state.year} draw={draw}/></>||<div></div>)
}

export default SearchYear
