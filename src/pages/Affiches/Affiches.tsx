import React,{useEffect, useState} from 'react'; 
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import { RouteComponentProps } from 'react-router';

type url = {
    value:string, 
    innerHTML: string,
  };
function Affiches(props: RouteComponentProps<{}, any, url | any>):JSX.Element  {
  const [url, setUrl] = useState(props.location.state.url)

  useEffect(() => {
    window.scrollTo(0,0)
    document.getElementsByClassName('modal__affiche')[0].addEventListener('click', (event) => {
    document.getElementsByClassName('modal__affiche')[0].classList.remove('open');
    document.getElementsByClassName('caption-class')[0].classList.remove('open');
    document.getElementsByClassName('full-affiche')[0].classList.remove('open');
    })
  },[])

  useEffect(() => {
    if (url != null){ 
    document.getElementsByClassName('modal__affiche')[0].classList.add('open');
    document.getElementsByClassName('caption-class')[0].classList.add('open');
    document.getElementsByClassName('full-affiche')[0].classList.add('open');
    document.getElementsByClassName('full-affiche')[0].attributes[0].value = props.location.state.url.value;
    document.getElementsByClassName('caption-class')[0].innerHTML = props.location.state.url.innerHTML;
    }
  },[props])

    const handleClickAffiche = (event:any):any => { 
    document.getElementsByClassName('modal__affiche')[0].classList.add('open');
    document.getElementsByClassName('caption-class')[0].classList.add('open');
    document.getElementsByClassName('full-affiche')[0].classList.add('open');
    //On attribut à l'affiche du modal la src de l'élément cliqué
    document.getElementsByClassName('full-affiche')[0].attributes[0].value = event.target.currentSrc;
    //On attribut au texte la valeur de l'alt de l'image cliqué
    document.getElementsByClassName('caption-class')[0].innerHTML = event.target.alt;
    setUrl('some')
    }

    return (
        <html>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous"/>
      <link rel="stylesheet" href="../styles/Home/Home.css" />

      <body>
        <Header />
           {/* --> Début Illustration*/}
           <div className="row content illustration__searchYear affiche">
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
        <div className="background__search-year affiche">
            <div className="grid_affiches">
              {new Array(20).fill(undefined).map((affiche, index:number) => { 
                    console.log('map 1 ')
                    return (
                        <img src={require('../../resources/Affiches/'+ (2021-index) +'.jpg').default} alt={"Affiche officielle de l'édition "+ (2021-index) + "de Rolland Garros"}
                        onClick={(event) => handleClickAffiche(event)} data-original={('../../resources/Affiches/'+(2021-index)+'.jpg')} className="grid_affiche_img imgAffiche carousel_item" />
                   )
                })
              }
            </div>
        </div>
            {/* --> Début Modal onClick affiche */}
            <div className="modal__affiche">
              <img src={require("../../resources/Affiches/2001.jpg").default} alt="alt" className="full-affiche"/>
              <p className="caption-class"></p>
            </div>
            {/* <-- Fin Modal onClick affiche */}
        <Footer />
      </body>
    </html>
    )
}

export default Affiches
