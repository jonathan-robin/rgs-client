import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import CardPlayer from '../../components/searchProfile/cardPlayer';
import SearchProfile_participation from "../../components/searchProfile/SearchProfile_participation";
import SearchProfile_matchs from "../../components/searchProfile/SearchProfile_matchs";
import {RouteComponentProps} from 'react-router-dom';
import Profil from '../../classes/profil';
import { __profil } from "../../classes/interface/__profil";
import react, {useEffect} from 'react';
import { usePlayersContext } from "../../contex/PlayersContext";

type profile = {
  profile:Profil
};
/**
* Renvoi les composants card/matchs/participation 
* @param { profile } profile : profil du joueur 
* @return {JSX.Element} 
*/
export default function SearchProfile(props: RouteComponentProps<{}, any, profile | any>):JSX.Element {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  },[props])

  const players = usePlayersContext();
  return (
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="../styles/Home/Home.css" />

      <body>
        <Header />

        {/* --> Début Illustration*/}
        <div className="row content illustration__search-profile">
          <div className="col-6">
            <img src={require('../../resources/Search-Profile/tennisPlayerOnCourt.svg').default} className="illustration__tennis--search-profile" />
          </div>
        </div>
        {/* <-- Fin Illustration*/}

        {/* --> Début SVG orange TOP */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg__search-profile--top">
          <path fill="#fff" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,133.3C384,160,480,224,576,229.3C672,235,768,181,864,181.3C960,181,1056,235,1152,218.7C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg__search-profile--top-ombre">
          <path fill="#fff" fill-opacity=".3" d="M0,128L48,122.7C96,117,192,107,288,133.3C384,160,480,224,576,229.3C672,235,768,181,864,181.3C960,181,1056,235,1152,218.7C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        {/* <-- Fin SVG orange TOP */}

        <div className="background__search-profile" >
        {/* --> Début background orange */}
        {/* <-- Début encart Profil */}
          <CardPlayer className='' profil={props.location.state.profil}/>
          <SearchProfile_participation editions={props.location.state.profil.participation}/>
        {/* --> Fin encart profil */}
{/* 
          <div className='button-group--Profile'>
            <div className="button button__profile button__profile--match">Bête noire</div>
          </div> */}

        {/* --> Début core matchList */}
        <SearchProfile_matchs matchList={props.location.state.profil.matchs} joueur={props.location.state.profil}/>
        {/* <-- Fin core matchList */}
        
        {/* <-- Fin background orange */}
        </div>
      <Footer />
    </body>
  </html>
  );
}
