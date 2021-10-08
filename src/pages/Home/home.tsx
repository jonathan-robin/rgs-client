import '../../sass/main.css';
import react, {useState} from 'react';
import usePool from '../../hooks/SearchPlayer/usePool';
import Player from '../../classes/player';
import SlidePoster from '../../components/common/SlidePoster';
import Footer from '../../components/common/footer';
import Header from '../../components/common/header';
import SearchYear_search from '../../components/home/SearchYear_search';
import SearchProfil_search from '../../components/home/SearchProfil_search';
import SearchCross_search from '../../components/home/SearchCross_search';
import SearchBull_search from '../../components/home/SearchBull_search';
import {
  BrowserRouter as Router,
  Route,
  Link 
} from 'react-router-dom';

function Home() {
  const [players, setPlayers] = useState<Player[]>(usePool());

  return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
          <link rel="stylesheet" href="../styles/Home/Home.css"/>
        </head>
        <body>
          <Header />

          {/* --> Début Illustration*/}
          <div className='row content'> 
            <div className="col-6">
              <img src={require('../../resources/Home/eiffel_tower.svg.svg').default} className="eiffelTower" alt='Tour eiffel svg'/>
            </div>
            <div className="col-3 ">
              <img src={require('../../resources/Home/tennis_portrait.svg').default} className="tennisPortrait" alt='Portrait Joueur tennis svg'/>
            </div>
          </div>
          {/* <-- Fin Illustration*/}  

          {/* --> Début SVG shape orange TOP*/}
          <svg xmlns="http://www.w3.org/2000/svg" className="wave wave--top--ombre" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="0.8" d="M0,96L34.3,101.3C68.6,107,137,117,206,106.7C274.3,96,343,64,411,74.7C480,85,549,139,617,160C685.7,181,754,171,823,154.7C891.4,139,960,117,1029,133.3C1097.1,149,1166,203,1234,213.3C1302.9,224,1371,192,1406,176L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="wave wave--top" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,96L34.3,101.3C68.6,107,137,117,206,106.7C274.3,96,343,64,411,74.7C480,85,549,139,617,160C685.7,181,754,171,823,154.7C891.4,139,960,117,1029,133.3C1097.1,149,1166,203,1234,213.3C1302.9,224,1371,192,1406,176L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
          {/* <-- Fin SVG shape orange*/}
          
        {/* --> Début background orange*/}
          <div className='myContainer'>
        {/* --> Début Bienvenue-texte d'accueil */}
            <div className='row content__text'> 
              <div className="col title-welcome">
                <div className='sub-title sub-title--welcome'>Bienvenue sur</div>
                <div className='title title--welcome'>RG STATS</div>
              </div> 
            </div>
            <div className='text-welcome content__text'>
              <div className="text-regular">
                Retrouvez les résultats des matchs qui se sont déroulés à Roland Garros depuis 1968 et des statistiques sur chaque participant.
              </div> 
              <div className="text-regular">
                  <div className='text__stats--matchs'>Plus de <u><b>6000</b></u> matchs</div>
                  <div className='text__stats--joueurs'><u><b>1500</b></u> joueurs</div>
                  <div className='text__stats--editions'><u><b>60</b></u> éditions</div>
              </div> 
            </div>
        {/* <-- Fin Bienvenue-texte d'accueil */}   
            
        {/* --> Début Recherche par Année */}
            <SearchYear_search/>
        {/* <-- Fin Recherche par Année */}

        {/* --> Début Slider Affiche */}
            <SlidePoster />

            {/* --> Début Modal onClick affiche */}
            <div className="modal__affiche">
              <img src={require("../../resources/Affiches/2001.jpg").default} alt="alt" className="full-affiche"/>
              <p className="caption-class"></p>
            </div>
            {/* <-- Fin Modal onClick affiche */}

            <div className='content-box__search content-box__search--slider col'>
              <Link to={{pathname:'/affiches', state:{url:null}}}>
              <button className="button button__carousel button__carousel--affiche">Les affiches</button>
              </Link>
            </div>
        {/* <-- Fin Slider Affiche */}


        {/* --> Début Recherche par Profil */}
            <SearchProfil_search players={players}/>
        {/* <-- Fin Recherche par profil */}
            </div>
        {/* <-- Fin background orange*/}

        {/* --> Début SVG shape orange BOTTOM*/}
            <svg xmlns="http://www.w3.org/2000/svg"  className='wave wave--bottom' viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L40,197.3C80,171,160,117,240,85.3C320,53,400,43,480,85.3C560,128,640,224,720,240C800,256,880,192,960,138.7C1040,85,1120,43,1200,37.3C1280,32,1360,64,1400,80L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className='wave wave--bottom wave--bottom-2' viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.5" d="M0,160L80,170.7C160,181,320,203,480,176C640,149,800,75,960,48C1120,21,1280,43,1360,53.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        {/* <-- Fin SVG shape orange BOTTOM*/}
            
        {/* --> Début SearchCross*/}
            <SearchCross_search players={players}/>
        {/* <-- Fin SearchCross*/}

        {/* --> Début SVG shape vert*/}
            <svg className='wave wave-bottom--green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,160C672,160,768,128,864,101.3C960,75,1056,53,1152,69.3C1248,85,1344,139,1392,165.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        {/* <-- Début SVG shape vert*/}
            
        {/* --> Début background vert*/}
            <div className='green'>
        {/* <-- Début Recherche Bonus */}
            <SearchBull_search players={players}/>
        {/* --> Fin Recherche Bonus */}

            <Footer />
            </div>
        {/* --> Fin background vert container */}
        </body>
      </html>
  );
}

export default Home;
