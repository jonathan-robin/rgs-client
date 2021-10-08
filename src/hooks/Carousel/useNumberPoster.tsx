import react from 'react'; 
import useWindowDimensions from './useWindowDimensions';

  /**
  * Retourne le nombre à afficher dans le slider par rapport au screenwidth
  */
export default function useNumberPoster():number{
    const {width, height} = useWindowDimensions();

    if(width <= 800) {
        return 3
    }
    else if(width > 800 && width <= 1000) {
        return 4
    }
    else if(width > 1000 && width <= 1200) {
        return 5
    }
    else if(width > 1200 && width <= 1400) {
        return 6
    }
    else if(width > 1400 && width <= 1600) {
        return 7
    }
    else if(width > 1600 && width <= 1800) {
        return 8
    }
    return 9;
}