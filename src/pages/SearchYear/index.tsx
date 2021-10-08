import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import SearchYear_draw from "../../components/searchYear/SearchYear_draw";
import SearchYear_finale from "../../components/searchYear/SearchYear_finale";
import { __draw } from "../../interface/__draw";

/**
* Renvoi les composants searchYear/draw/finale
* @param { number } year : l'année rentrée dans l'input 
* @param { draw } draw : le tableau des tours 1 à 7
* @return {JSX.Element} 
*/
export default function searchYear(props:{year:number, draw:__draw}) {
  return (
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="../styles/Home/Home.css" />

      <body>
        <Header />
        <SearchYear_finale year={props.year} draw={props.draw} /> 

           {/* --> Début Illustration*/}
           <div className="row content illustration__searchYear">
          <div className="col-6">
            <img src={require('../../resources/Home/eiffel_tower.svg.svg').default} className="eiffelTower__searchYear" />
          </div>
        </div>
        {/* <-- Fin Illustration*/}

        {/* --> Début SVG shape orange TOP*/}
        <svg xmlns="http://www.w3.org/2000/svg" className='svg__search-year--orange' viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,192L40,208C80,224,160,256,240,245.3C320,235,400,181,480,170.7C560,160,640,192,720,213.3C800,235,880,245,960,213.3C1040,181,1120,107,1200,80C1280,53,1360,75,1400,85.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" className='svg__search-year--orange--ombre' viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="0.45" d="M0,192L40,208C80,224,160,256,240,245.3C320,235,400,181,480,170.7C560,160,640,192,720,213.3C800,235,880,245,960,213.3C1040,181,1120,107,1200,80C1280,53,1360,75,1400,85.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
        {/* <-- Fin SVG shape orange TOP*/}
     
        {/* --> Début container background orange*/}
        <div className="background__search-year">
        <SearchYear_draw year={props.year} draw={props.draw} /> 
        </div>
        <Footer />
      </body>
    </html>
  );
}
