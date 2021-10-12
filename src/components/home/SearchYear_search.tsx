import react, {useState, useEffect, useContext, SyntheticEvent} from 'react'; 
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';
import {__draw} from '../../classes/interface/__draw';
import $ from 'jquery';
import Player from '../../classes/player';
import { usePlayersContext } from '../../contex/PlayersContext';

 /**
  * Retourne le search Box de Home pour la recherche par édition
  */
function SearchYear_search() {
    const players = usePlayersContext();
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [draw, setDraw] = useState<__draw>()

    useEffect(() => {
        if (isValid){ 
            $('#selectInfosSpanSearchYear').removeAttr('data-descr')
        }
        else{
            $('#selectInfosSpanSearchYear').attr('data-descr', "Veuillez d'abord rentrer une année valide !" );
        }
    },[isValid])

    useEffect(() => { 
        parseInt(inputValue) > 1968 && parseInt(inputValue) < 2019 ? setIsValid(true) : setIsValid(false);
    },[inputValue])

    const handleChangeInput = (event:any) => { 
        setInputValue(event.currentTarget.value);
    }
    const handleOnClickButton = () => { 
    }

    return (
            <div className="row">
            {/* --> Début Recherche par Année */}
            <div className="content-box content-box--year col-12">
                <div className="content-box__text">
                <div className="sub-title sub-title--year">
                    Recherche par annee
                </div>
                <div className="text-regular">
                    Retrouvez le tableau complet d'une édition particulière de 1968 à 2021. <br></br>
                    Tapez dans la barre de recherche qui suit "1999" et vous avez accès au tableau homme de 1999, les 127 matchs qui s'y sont déroulés avec les résultats de chaque match.
                </div>
                </div>
                <div className="content-box__search content-box__search--year col">
                <input className="input form-control input--year" type="text" placeholder="Entre 1968 et 2021..." onChange={handleChangeInput}/>
                    {/* <span className='tooltiptext'>Veuillez rentrer une année entre 1968 et 2021.</span> */}
                    <span id='selectInfosSpanSearchYear' className="selectInfos" data-descr="Veuillez d'abord rentrer une année valide !">
                    <Link style={{pointerEvents: isValid ? 'all' : 'none'}} to={{pathname:'/searchYear', state:{year:inputValue}}}>
                        <button style={{pointerEvents: isValid ? 'all' : 'none'}} id="button_search-year" onClick={handleOnClickButton} data-toggle="tooltip" data-placement="left" type="button" className="button button__search--year">
                                Rechercher
                        </button>
                    </Link>
                    </span>
                </div>
            </div>
            {/* <-- Fin Recherche par Année */}
            </div>
    )
}

export default SearchYear_search
