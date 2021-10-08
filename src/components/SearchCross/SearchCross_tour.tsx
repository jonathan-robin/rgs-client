import react, {useState, useEffect} from 'react';
import $ from 'jquery';

function SearchCross_tour(props:{disabled:boolean,resetInputValue:any, handleSetTour:any}) {
    const [reset, setReset] = useState(props.resetInputValue);

    useEffect(() => {
        if (props.resetInputValue){ 
            $('label.content-box__search--cross-search--tour select').val('unselected')
        }
        if (!props.disabled){
            $('#selectInfosSpanTour').removeAttr('data-descr')
        }
        setReset(false);
    },[props.resetInputValue, props.disabled])

    const handleOnChangeSelectedTour = (event:any) => { 
        props.handleSetTour(parseInt(event.currentTarget.value))
    }

    return(
        <label className='content-box__search--cross-search--tour'><p>Tour</p>
                <span id='selectInfosSpanTour' className="selectInfos" data-descr="Veuillez d'abord sélectionner un joueur !">
        <select style={{pointerEvents: props.disabled ? 'none' : 'all'}} className="form-select" name="tour" id="tour-select" onChange={event => handleOnChangeSelectedTour(event)}>
                <option value="unselected" >Tour</option>
                <option value="1">Tour 1</option>
                <option value="2">Tour 2</option>
                <option value="3">Tour 3</option>
                <option value="4">Huitieme</option>
                <option value="5">Quart</option>
                <option value="6">Demi</option>
                <option value="7">Finale</option>
        </select>
        </span>
        </label>
        )
}

export default SearchCross_tour


