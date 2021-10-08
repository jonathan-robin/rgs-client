import react, {useState, useEffect, useCallback} from 'react'; 
import useCarousel from '../../hooks/Carousel/useCarousel';
import useWindowDimensions from '../../hooks/Carousel/useWindowDimensions';

export interface Affiche{
    url:string,
    year:string
}

 /**
  * Retourne Le slider de la page Home
  */
function SlidePoster():any{
  const lesAffiches:Affiche[] = [];
  const [activePoster, setActivePoster] = useState(0);
  const {poster, numberPosterDisplayed} = useCarousel(lesAffiches, activePoster);


  //Création liste des Affiches
  for (var i = 2001; i <= 2021; i++){
    let affiche:Affiche = { 
      url : '../../resources/Affiches/'+i+'.jpg', 
      year : i.toString()}
    lesAffiches.push(affiche);
  }

  /**
  * Slide le carousel des affiches vers la droite ou gauche
  * @param { String } direction
  */
  var updateSlidePosition = (direction:string):void => { 
    //Toutes les affiches visibles ou non
    const AllSlide = Array.from(document.getElementsByClassName('carousel_item') as HTMLCollectionOf<HTMLElement>)
    //On masque toutes les affiches
    AllSlide.forEach(element => {
      element.classList.remove('carousel_item--visible')
      element.classList.add('carousel_item--hidden')
    })
    switch (direction){
      //User a cliqué next
      case 'next':
        //Si il n'y plus d'affiche suivantes on rend visible les x dernieres, x  = taille du carousel
        if(activePoster + (numberPosterDisplayed * 2) >= AllSlide.length){
          for (var i = AllSlide.length - 1; i > (AllSlide.length - numberPosterDisplayed) - 1; i--){
            AllSlide[i].classList.remove('carousel_item--hidden');
            AllSlide[i].classList.add('carousel_item--visible');
          }
          setActivePoster(AllSlide.length - numberPosterDisplayed);
        }
        //Sinon on affiche les x prochaines
        else{
          for (var i = numberPosterDisplayed; i <= (numberPosterDisplayed+  numberPosterDisplayed) - 1; i++ ){
            AllSlide[activePoster + i].classList.remove('carousel_item--hidden');
            AllSlide[activePoster + i].classList.add('carousel_item--visible');
          }
          setActivePoster(activePoster + numberPosterDisplayed);
        }
        break;
      //User a cliqué précédent
      case 'previous':
        //Si pas assez d'affiches restantes, on affiche les x premieres
        if(activePoster === 0 || activePoster - numberPosterDisplayed < 0){
          for (var i = 0; i < numberPosterDisplayed; i++){
            AllSlide[i].classList.remove('carousel_item--hidden');
            AllSlide[i].classList.add('carousel_item--visible');
          }
          setActivePoster(0);
          break;
        }
        //Sinon on affiche les x précédentes
        for (var h = activePoster - 1; h >= activePoster - numberPosterDisplayed; h--){
          AllSlide[h].classList.remove('carousel_item--hidden')
          AllSlide[h].classList.add('carousel_item--visible')
        }
        setActivePoster(activePoster - numberPosterDisplayed);
        break;
    }
  }

  return (
    <div className="carousel">
      <div className='lesAffiches'>{poster}</div>
        <div className="carousel_actions">
        <button id="carousel_button--previous" className="button button__carousel button__carousel--previous" onClick={() => updateSlidePosition('previous')} aria-label='Affiches précédentes'>&lt; </button>  
        <button id="carousel_button--next" className="button button__carousel button__carousel--next" onClick={() => updateSlidePosition('next')} aria-label='Affiches suivantes'>&gt;</button> 
      </div>
    </div>
  )
}

export default SlidePoster