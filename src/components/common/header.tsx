import {Link} from 'react-router-dom';

// Render le Header
export default function Header(){
    return(
        <>
            <div className='row content'> 
                <div className="col-3 header__logo">
                    <Link to="/">
                        <img src={require('../../resources/logo.png').default} className="logo"/>
                    </Link>
                </div> 
                <div className="col header__title">
                    <div className='title'> RG STATS</div>
                </div>
                <div className="col-3 header__smallText">
                    <div className="row smallText">
                        Contribuer
                    </div>
                    <div className="row smallText">
                        Plan du site
                    </div>
                </div>
            </div>
            <div className="row content">
                <div className="col-6 sub-title header__slogan">
                    Tous les matchs du french open depuis 1968
                </div>
            </div>
        </>
    )
}