import react,{useState, useEffect} from 'react'; 
import usePool from '../../hooks/SearchPlayer/usePool';
import Player from '../../classes/player';
import Profil from '../../classes/profil';
import SearchBull from '../SearchBull/SearchBull';
import $ from 'jquery';
import { usePlayersContext } from '../../contex/PlayersContext';

export default function SearchBull_search(){ 
    const [inputValue, setInputValue] = useState<string>('');
    const [display,setDisplay] = useState<boolean>(false); 
    const [profil, setProfil] = useState<Profil | null>(); 
    const players = usePlayersContext()

    useEffect(() => {
        inputValue != "" &&
          document.getElementById("root")?.addEventListener("click", function () {
            document
              .getElementsByClassName("proposition_player--searchBull")[0]
              ?.classList.add("hidden");
          });
        return () => {
          document
            .getElementById("root")
            ?.removeEventListener("click", function () {});
        };
      }, [inputValue]);

    const handleOnChange = (event: any) => {
        setInputValue(event.target.value);
        setDisplay(true);
        document
          .getElementsByClassName("proposition_player--searchBull hidden")[0]
          ?.classList.remove("hidden");
      };
    
      function HandleClickPlayer(event: any, player: Player) {
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
            players:players.players
          }),
        })
          .then((res) => res.json())
          .then((res) => setProfil(res));
          setInputValue(player.player_nom + ' ' + player.player_prenom)
          $('html,body').animate({
            scrollTop: $(".grid__modal__bull").offset()?.top});
    };

      const handleClickReset = () => { 
        setInputValue(''); 
        setProfil(null);
      }

    return(
        <div className="container">
        <div className="row">
          <div className="content-box content-box--bull col-12">
            <div className="content-box__text">
              <div className="sub-title sub-title--bull">Recherche Bonus</div>
              <div className="sub-title--lighter sub-title--lighter--bull">Qui est sa bête noire ?</div>
              <div className="text-regular text-regular--bull">Un dernier type de recherche ; par bête noire ! 
                Vous voulez savoir contre qui votre joueur préféré a le plus de défaite à Roland Garros ? Rentrez le nom d'un joueur et découvrez contre qui ce joueur a le plus de défaites
                ainsi que le détail de chacune de ces rencontres.
              </div>
            </div>
            <div className="content-box__search content-box__search--bull col-8">
              <input
          className="input form-control input--profil"
          type="text"
          placeholder="Nom d'un joueur..."
          value={inputValue}
          onChange={(event) => handleOnChange(event)}
        />
        {display && (
          <div className="proposition_player--searchBull hidden">
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
    )
}