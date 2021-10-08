import react,{useState, useEffect} from 'react'; 
import Profil from '../../classes/profil';
import { __match } from '../../interface/__match';
import Match from '../../classes/match';
import { useHistory } from 'react-router';
import { HandleClickProfile } from '../utils/HandleClickProfile';
import $ from 'jquery';
import { HandleClickYear } from '../utils/handleClickYear';
// import bull from '../../resources/bull/bull.svg';

export interface bull{
    id:number
    joueur:{nom:string, prenom:string, id:string, nat:string}[],
    matchs:__match[]
}

export default function SearchBull(props:{profil:Profil}){ 
    const [profil, setProfil] = useState<Profil>(props.profil); 
    const [bull, setBull] = useState<bull>();
    const history = useHistory();

    useEffect(() => { 
        fetch('https://rgstatsapi.herokuapp.com/bull', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(profil),
        })
        .then(res => res.json())
        .then(res => setBull(res))
        $('html,body').animate({
            scrollTop: $(".grid__modal__bull").offset()?.top});
    },[props.profil])

    console.log(bull);
    console.log(profil);
    return(
        <div className="modal__bull">
        <img src={require('../../resources/bull/bull.svg').default} className='img--bull'/>
            <div className="grid__modal__bull">
                 <div className="modal__bull--selected">
                    JOUEUR
                </div>
                <div className="modal__bull--selected" style={{cursor:'pointer'}}
                onClick={() => {HandleClickProfile(history, {nom:profil.nom_joueur, prenom:profil.prenom_joueur,id:profil.id_joueur, nat:profil.nat_joueur})}}>
                    {profil.nom_joueur} {profil.prenom_joueur}
                </div>
                {bull && 
                <>
                <div className="modal__bull--info">BETE NOIRE</div>
                <div className="modal__bull--info" onClick={() => {HandleClickProfile(history, bull.joueur[0])}} style={{cursor:'pointer'}}>{bull.joueur[0].nom} {bull.joueur[0].prenom}</div>
                <div className="modal__bull--info">{bull.matchs.length} Défaites</div>
                <div className="modal__bull--matchList">

                {bull.matchs.map((m,index) => { 
                    let match = new Match(m);
                    return(
                        <div className="modal__bull--match">
                        <div className="modal__bull--match--tour">{match.tourString}</div>
                        <div className="modal__bull--match--year" style={{cursor:'pointer'}} onClick={() => {HandleClickYear(history, match.annee)}} >{match.annee}</div>
                        <div className="modal__bull--match--score">{match.infos_vainq.score}</div>
                    </div>
                    )
                })}
                </div>
               </>
                }
            </div>
        </div>
    )
}