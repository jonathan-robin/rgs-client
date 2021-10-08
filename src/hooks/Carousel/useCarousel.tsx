import {Affiche} from '../../components/common/SlidePoster';
import useWindowDimensions from './useWindowDimensions';
import useNumberPoster from './useNumberPoster';
import react, {useEffect, useState} from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

  /**
  * Handle le click sur une affiche pour l'afficher en full size dans un modal
  */
const HandleClickAffiche = (history:any, event: React.MouseEvent<HTMLElement>) => {
    history.push({pathname:'/affiches', state:{url:{value:event.currentTarget.attributes[1].value, innerHTML: event.currentTarget.attributes[2].value}}});
}

  /**
  * Retourne un tableau d'HTMLElement des affiches visibles et hidden
  * lorsqu'il y a un resize
  */
function getPoster(Poster:Affiche[], numberPosterDisplayed:number, activePoster:number, history:any){ 
    const lesAffiches__className:any[] = [];
    let lesAffiches:any = []; 
    //On cache toutes les affiches
    Poster.forEach(element => {
        lesAffiches__className.push({
            className:'imgAffiche carousel_item carousel_item--hidden',
            src:'src/resources/Affiches/'+element.year+'.jpg',
            key:element.year
        })
    })
    //On rend visible les affiches avec l'indice ActivePoster et le nombre d'affiche display actuellement
    for (var j = activePoster; j < activePoster + numberPosterDisplayed; j++){
        lesAffiches__className[j].className = 'imgAffiche carousel_item carousel_item--visible';
    }
    lesAffiches__className.forEach(element => { 
        lesAffiches.push(
            <img className={element.className} src={require('../../resources/Affiches/'+element.key+'.jpg').default} key={element.key} 
            alt={"Affiche officielle de Roland Garros "+element.key}
            data-original={('../../resources/Affiches/'+element.key+'.jpg')}
            onClick={(event) => HandleClickAffiche(history, event)}            
            />
        )
    })
        return lesAffiches;
}

  /**
  * Retourne les affiches 
  * @returns { HTMLElement } poster : les affiches visibles ou non 
  * @returns { number } numberPosterDisplayed : le nombre d'affiches visible 
  */
export default function useCarousel(Poster:Affiche[], activePoster:number){
    const history = useHistory();
    const {width, height} = useWindowDimensions();
    const getNumberPoster = useNumberPoster();
    const [poster, setPoster] = useState(); 
    const [numberPosterDisplayed, setNumberPosterDisplayed] = useState(getNumberPoster);

    //calcul nb d'affiches visible dès qu'un resize
    useEffect(() => {
        setNumberPosterDisplayed(getNumberPoster);
        setPoster(getPoster(Poster,numberPosterDisplayed, activePoster, history));
    },[width])

    return {
        poster,
        numberPosterDisplayed
    }
} 
