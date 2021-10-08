import React from 'react';
import { useHistory } from 'react-router-dom';

export interface editions{
    IDEDITION:number, 
    ANNEE:string
}
/**
* Renvoi les editions participées sur la page profile
* @param { editions[] } editions : Les idEditions participées ainsi que l'année respective
* @return {JSX.Element} 
*/
function SearchProfile_participation(props:{editions:any}):any {
    const history = useHistory();

    //Au clic sur une année on push searchYear de l'année cliquée
    const handleOnClick = (event:any) => { 
        history.push({pathname:'/searchYear', state:{year: event.currentTarget.id}})
    }
    
    return (
        <div className='button-group--Profile--year'>
       {props.editions.map((edition:any, index:number) => { 
            return (<div onClick={event => handleOnClick(event)} className="button__profile--year" id={edition[0].ANNEE}>{edition[0].ANNEE}</div>)
        })}
        </div>
    )
}
export default SearchProfile_participation