import react,{useEffect} from 'react'; 
import Profil from '../../classes/profil';
import __profil from '../../classes/profil';

/**
* Affiche la card profil sur la page Profil
* @param { string } className : Afficher différents css
* @param { Profil } profil : le profil du joueur
* @return {JSX.Element} 
*/
export default function CardPlayer(props:{className:string, profil:Profil}){ 
    const profil:Profil = new Profil(props.profil);
    useEffect(() => {
        props.className === 'cardPlayer__searchPlayer' && document.getElementById('eiffeltower')?.classList.add('hidden');
    },[])
    return (
        
        <div className="card card__profile">
        <div id="eiffeltower" className="col-12 eiffelwrapper">
            <img src={require('../../resources/Home/eiffel_tower.svg.svg').default} className="eiffelTower__search-profile" />
      </div>
          <div className="card__profile--grid">
              <div className="card__profile__label--info card__profile__info--name">
                  {props.profil.nom_joueur}</div>
              <div className="card__profile__label--info card__profile__info--prenom">
              <img src={require('../../resources/flags/'+props.profil.nat_joueur+".png").default} className="flagProfile" />
                  {props.profil.prenom_joueur} 
              </div>
              {/* <div className="card__profile__label--info card__profile__info--drapeau">
            </div> */}
              <div className="card__profile__label--info card__profile__info--photo"> 
              <img src={require('../../resources/Search-Profile/cat.jpg').default} /></div>
              <div className="card__profile__label card__profile__label--first-time">DEBUT PARTICIPATION <p className="card__profile__result card__profile__result--first-time">{props.profil.premiere_participation}</p></div>
              <div className="card__profile__label card__profile__label--last-time">FIN PARTICIPATION <p className="card__profile__result card__profile__result--last-time">{props.profil.derniere_participation}</p></div>
              <div className="card__profile__label card__profile__label--number-time">PARTICIPATION <p className="card__profile__result card__profile__result--number-time">{props.profil.participation.length}</p></div>
              <div className="card__profile__label card__profile__label--number-win">VICTOIRE <p className="card__profile__result card__profile__result--number-win">{props.profil.nb_win}</p></div>
              <div className="card__profile__label card__profile__label--number-loose">DEFAITE <p className="card__profile__result card__profile__result--number-loose">{profil.nb_loose}</p></div>
              <div className="card__profile__label card__profile__label--ratio">RATIO <p className="card__profile__result card__profile__result--number-win">{props.profil.ratio}%</p></div>
              <div className="card__profile__label card__profile__label--best">MEILLEURE TOUR <p className="card__profile__result card__profile__result--best">{profil.meilleur_tour.tour} en {profil.meilleur_tour.year}</p></div>
              <div className="card__profile__label card__profile__label--worst">PIRE TOUR <p className="card__profile__result card__profile__result--worst">{profil.pire_tour.tour} en {profil.pire_tour.year}</p></div>
          </div>
      </div>
              
    )
}