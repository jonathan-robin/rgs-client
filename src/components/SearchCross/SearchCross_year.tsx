import React,{useState, useEffect} from 'react'; 
import $ from 'jquery';

function SearchCross_year(props:{disabled:boolean,resetInputValue:any, handleSetYear:any}) {
    const [reset, setReset] = useState(props.resetInputValue);

    useEffect(() => {
        if (props.resetInputValue){ 
            $('label.content-box__search--cross-search--year select').val('unselected')
        }
        if (!props.disabled){
            $('#selectInfosSpan').removeAttr('data-descr')
        }
        setReset(false);
    },[props.resetInputValue, props.disabled])

    const handleOnChangeSelectedYear = (event:any) => { 
        props.handleSetYear(event.currentTarget.value)
    }

    return (
        <label className='content-box__search--cross-search--year'><p >Année</p>
            <span id='selectInfosSpan' className="selectInfos" data-descr="Veuillez d'abord sélectionner un joueur !">
        <select className="form-select" style={{pointerEvents: props.disabled ? 'none' : 'all'}} name="year" id="year-select" onChange={event => handleOnChangeSelectedYear(event)}>
            <option id='Select-year' value="unselected">Année</option>
            {new Array(52).fill(undefined).map((v,i) => {
                return (<option className='optionYear' value={v} key={i}>{2019-i}</option>)
            })}
        </select></span></label>
    )
}

export default SearchCross_year
