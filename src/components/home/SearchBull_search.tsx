import react,{useState, useEffect} from 'react'; 
import usePool from '../../hooks/SearchPlayer/usePool';
import Player from '../../classes/player';
import Profil from '../../classes/profil';
import SearchBull from '../SearchBull/SearchBull';
import $ from 'jquery';
import { usePlayersContext } from '../../contex/PlayersContext';

export default function SearchBull_search(){ 
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [display,setDisplay] = useState<boolean>(false); 
    const [profil, setProfil] = useState<Profil | null>(); 
    const players = usePlayersContext()

    // Lorsqu'un clic autre part que sur l'input on le cache
  document.addEventListener("click", function (e:any) {
    if (e.target.id !== 'proposition_player--SearchBull'){
      document.getElementById('proposition_player--SearchBull--select')?.classList.add("hidden");
    }
  });
  
  // Lorsqu'un clic sur input on affiche
  const handleClickInput = () => { 
    if (inputValue !== '') {  document.getElementById('proposition_player--SearchBull--select')?.classList.remove('hidden') }
    else { document.getElementById('proposition_player--SearchBull--select')?.classList.add('hidden') }
  }

  // onInput si value est vide on cache sinon on affiche
    const handleOnChange = (event: any) => {
        setInputValue(event.target.value);
        if (event.target.value != ''){ document.getElementById('proposition_player--SearchBull--select')?.classList.remove('hidden'); setDisplay(true); }
        else{ document.getElementById('proposition_player--SearchBull--select')?.classList.add('hidden'); setDisplay(false) }
      };
    
      function HandleClickPlayer(event: any, player: Player) {
        setIsLoading(true);
        setProfil(null)
        fetch("https://rgstatsapi.herokuapp.com/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nom: player.player_nom,
            prenom: player.player_prenom,
            id: player.player_id,
            nat: player.player_nat,
          }),
        })
          .then((res) => res.json())
          .then((res) => setProfil(res))
          .then((res) => setIsLoading(false))
          .then((res) => setInputValue(player.player_nom + ' ' + player.player_prenom))
          .then((res) => document.getElementsByClassName("grid__modal__bull")[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}))
          document.getElementById('proposition_player--SearchBull--select')?.classList.add('hidden')
          setDisplay(false)
    };

      const handleClickReset = () => { 
        setInputValue(''); 
        setProfil(null);
      }

    return(<>
      {!isLoading ? 
        <div className="container">
        <div className="row">
          <div className="content-box content-box--bull">
            <div className="content-box__text">
              <div className="sub-title sub-title--bull">Recherche Bonus</div>
              <div className="sub-title--lighter sub-title--lighter--bull">Qui est sa bête noire ?</div>
              <div className="text-regular text-regular--bull">Un dernier type de recherche ; par bête noire ! 
                Vous voulez savoir contre qui votre joueur préféré a le plus de défaite à Roland Garros ? Rentrez le nom d'un joueur et découvrez contre qui ce joueur a le plus de défaites
                ainsi que le détail de chacune de ces rencontres.
              </div>
            </div>
            <div className="content-box__search content-box__search--bull">
              <input
          className="input form-control input--profil"
          id="proposition_player--SearchBull"
          type="text"
          placeholder="Nom d'un joueur..."
          value={inputValue}
          onClick={() => handleClickInput()}
          onChange={(event) => handleOnChange(event)}
        />
        {display && (
          <div className="proposition_player--searchBull hidden"
          id="proposition_player--SearchBull--select"
          >
            {players.players
              ?.filter(
                (player: Player) =>
                  player.player_nom
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1 ||
                  player.player_prenom
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1 ||
                  (player.player_nom+' '+player.player_prenom)
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1
              )
              .map((player, index) => {
                return (
                  <div
                    className="propal_joueur"
                    onClick={(event) => HandleClickPlayer(event, player)}
                    tabIndex={0}
                    key={index}
                  >
                    <img
                      className="draw__flag propal"
                      src={
                        require("../../resources/flags/" +
                          player.player_nat +
                          ".png").default
                      }
                    />
                    {player.player_nom} {player.player_prenom}
                  </div>
                );
              })}
          </div>
        )}
              <button type="button" id='button__search--bull' className="button button__search--bull" onClick={handleClickReset}>Réinitialiser</button>
            </div>
          </div>
        </div>
        {profil && <SearchBull profil={profil}/>}
      </div>
:  <div className='LoadingScreen'>
<div className="ring">
<span className='spanRing'></span>
</div>
</div>}
</> 
    )
}