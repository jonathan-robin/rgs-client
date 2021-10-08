import{__match} from './__match';

export interface __profil{ 
    id_joueur:number,
    nom_joueur:string,
    prenom_joueur:string,
    nat_joueur:string,
    participation:number,
    premiere_participation:number,
    derniere_participation:number,
    nb_win:number,
    nb_loose:number,
    ratio:number,
    meilleur_tour:number,
    pire_tour:number, 
    matchs:[__match],
}
