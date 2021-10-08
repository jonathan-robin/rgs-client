import Profil from '../../classes/profil';

function FetchSearchCross(props:{tour:number | null, year:number | null, profil:Profil}):any {
    const promise = new Promise((resolve, reject) => {
        fetch('https://rgstatsapi.herokuapp.com/cross', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({tour:props.tour, year:props.year, id_joueur:props.profil.id_joueur}),
        })
        .then(res => res.json())
        .then(res => resolve(console.log('res fetch',res)))
    })
        
    return promise;
}

export default FetchSearchCross
