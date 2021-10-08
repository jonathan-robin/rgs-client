import{__match} from '../interface/__match';
import { editions } from '../components/searchProfile/SearchProfile_participation';

export interface __profil{ 
    id_joueur:number,
    nom_joueur:string,
    prenom_joueur:string,
    nat_joueur:string,
    participation:editions[],
    premiere_participation:number,
    derniere_participation:number,
    nb_win:number,
    nb_loose:number,
    ratio:number,
    meilleur_tour:any,
    pire_tour:any, 
    matchs:[__match],
}


class Profil{ 
    id_joueur; participation;nom_joueur;prenom_joueur;nat_joueur;derniere_participation;premiere_participation;nb_win;nb_loose;ratio;
    meilleur_tour;
    ;pire_tour;matchs;
    nb_participation:number=0;
    constructor(profil:__profil){ 
        this.id_joueur = profil.id_joueur;
        this.participation = profil.participation;
        this.nom_joueur = profil.nom_joueur;
        this.prenom_joueur = profil.prenom_joueur;
        this.nat_joueur = profil.nat_joueur;
        this.derniere_participation = profil.derniere_participation; 
        this.premiere_participation = profil.premiere_participation; 
        this.nb_win = profil.nb_win;
        this.nb_loose = profil.nb_loose; 
        this.ratio = profil.ratio;
        this.meilleur_tour = this.get_meilleur_tour(profil.meilleur_tour); 
        this.pire_tour = this.get_pire_tour(profil.pire_tour); 
        this.matchs = profil.matchs;
        this.nb_participation = this.get_nb_participation(profil.participation);
    }

    get_nb_participation(participation:editions[]):number{ 
        return participation.length;
    }

    get_meilleur_tour(tour:any):any{
        let Tour = {tour:'', year:0}
        switch(tour.tour){ 
            case 0 : 
                Tour.tour = '1er tour'
            break;
            case 1 : 
                Tour.tour = '2eme tour'
            break;
            case 2 :
                Tour.tour = "3eme tour"
            break;
            case 3 : 
                Tour.tour = "Huitième de finale"
            break;
            case 4 :
                Tour.tour = "Quart de finale"
            break;
            case 5 : 
                Tour.tour = "Demi-finale"
            break;
            case 6 :
                Tour.tour = "Finale"
            break;
            case 7 :
                Tour.tour = "Vainqueur"
            break;
            default:
                Tour.tour = '1er tour'
            break;
        }
        if (tour.idedition <= 52){
            Tour.year = 2019 - tour.idedition;
        }
        else{ 
            Tour.year = tour.idedition + 1968;
        }
        return Tour;

    }
    get_pire_tour(tour:any):any{
        let Tour = {tour:'', year:0}
        switch(tour.tour){ 
            case 0 : 
                Tour.tour = '1er tour'
            break;
            case 1 : 
                Tour.tour = '1er tour'
            break;
            case 2 :
                Tour.tour = "2eme tour"
            break;
            case 3 : 
                Tour.tour = "3ème tour"
            break;
            case 4 :
                Tour.tour = "Huitième de finale"
            break;
            case 5 : 
                Tour.tour = "Quart de finale"
            break;
            case 6 :
                Tour.tour = "Demi-finale"
            break;
            case 7 :
                Tour.tour = "Finale"
            break;
            default:
                Tour.tour = '1er tour'
            break;
        }
        if (tour.idedition <= 52){
            Tour.year = 2019 - tour.idedition;
        }
        else{ 
            Tour.year = tour.idedition + 1968;
        }
        return Tour;
    }
}
export default Profil