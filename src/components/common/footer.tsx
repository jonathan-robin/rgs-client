// Render le footer
export default function Footer():JSX.Element{
    return (
        <div className='col footer footer--search-year'>
            <ul className='row footer__list'>
                <li className='col footer__item'>Plan du site</li>
                <li className='col footer__item'>Contribuer</li>
                <li className='col footer__item'>Accéder à la base de données</li>
                <li className='col footer__item'>Conditions d'utilisation</li>
            </ul>
            <div className="col footer__footer">
                <div className="row footer__item--copyright">Site mis en ligne et désigné par Jonathan ROBIN</div>
                <div className="row footer__item--copyright">© jonathan-robin.com. Tous droits réservés.</div>
            </div>
        </div>
    )
}