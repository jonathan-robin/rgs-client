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

    // console.log(props.players)

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
                    <Link to={{pathname:'/searchYear', state:{year:inputValue}}}>
                    {/* <span id='selectInfosSpan' className="selectInfos" data-descr="Veuillez d'abord sélectionner un joueur !">
        <select className="form-select" style={{pointerEvents: props.disabled ? 'none' : 'all'}} name="year" id="year-select" onChange={event => handleOnChangeSelectedYear(event)}>
            <option id='Select-year' value="unselected">Année</option>
            {new Array(52).fill(undefined).map((v,i) => {
                return (<option className='optionYear' value={v} key={i}>{2019-i}</option>)
            })}
        </select></span> */}
                    <span id='selectInfosSpanSearchYear' className="selectInfos" data-descr="Veuillez d'abord rentrer une année valide !">
                        <button style={{pointerEvents: isValid ? 'all' : 'none'}} id="button_search-year" onClick={handleOnClickButton} data-toggle="tooltip" data-placement="left" type="button" className="button button__search--year">
                                Rechercher
                        </button>
                    </span>
                    </Link>
                </div>
            </div>
            {/* <-- Fin Recherche par Année */}
            </div>
    )
}

export default SearchYear_search
