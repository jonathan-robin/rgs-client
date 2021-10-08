import react, {useState, useEffect} from 'react'; 

  /**
  * Retourne les screen dimensions
  */
function getWindowDimensions(){ 
    const {innerWidth: width, innerHeight:height} = window; 
    return {
        width,
        height
    }
}

  /**
  * Retourne les screen dimensions recalculée à chaque resize
  */
export default function useWindowDimensions(){
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions()); 

    useEffect(() => {
        function handleResize(){
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
    },[])

    return windowDimensions;
} 