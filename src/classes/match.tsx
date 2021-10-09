// import { get_filtered_set } from "../api/utils/utils";
import { __scoreSorted } from "./interface/__scoreSorted";
import tourToString from "../components/utils/tourToString";

 /**
  * Reformate les scores et retourne sans champ vide
  * @param { score } []string
  * @returns { []string }
  */
  export function get_filtered_set(score:string[]){
    // On retourne les sets non vides
    var filterSet = score.filter(function(set){ return set != "" && set != " " && set != "ab";});
    // Si le set est supérieure à 60(64 = 6/4 au tie break), on retourne 6;
    filterSet.map((set, index) => {if (parseInt(set) > 60){filterSet[index] = "6"}})
    console.log(filterSet);
    return filterSet;
}

export interface __match{ 
    IDMATCH:number,
    IDEDITION:number,
    nat_IDJ1:string,
    nat_IDJ2:string,
    prenom_IDJ1 :string, 
    prenom_IDJ2 :string, 
    nom_IDJ1:string,
    nom_IDJ2:string,
    IDJ1:number,
    IDJ2:number,
    Tour:number,
    VAINQ: number,
    set1l:string,
    set1w:string,
    set2l:string,
    set2w:string,
    set3l:string,
    set3w:string,
    set4l:string,
    set4w:string,
    set5l:string,
    set5w:string,
}
export interface __infosMatch{ 
    nom:string, 
    prenom:string,
    nat:string, 
    score:__scoreSorted, 
    id:number
}

/**
 * @class
 * @classdesc Crée match objet pour récupérer infos profil 
 */
class Match{ 
    score:string[] = [];
    match:__match;
    score_sorted: __scoreSorted = {idj1:'',idj2:''};
    fullName_idj1:string;
    fullName_idj2:string;
    nat_idj1:string;
    nat_idj2:string;
    infos_vainq:__infosMatch;
    infos_looser:__infosMatch;
    annee:number;
    tourString:string;
    constructor(match:__match){
        this.score = [match.set1w, match.set1l, match.set2w, match.set2l, match.set3w,match.set3l, match.set4w,match.set4l, match.set5w,match.set5l]
        this.match = match;
        this.score_sorted = this.get_valid_set(this.score);
        this.fullName_idj1 = this.get_fullName_idj1(match.prenom_IDJ1, match.nom_IDJ1);
        this.fullName_idj2 = this.get_fullName_idj2(match.prenom_IDJ2, match.nom_IDJ2);
        this.infos_vainq = this.get_infos_vainq(match);
        this.infos_looser = this.get_infos_looser(match);
        this.nat_idj1 = match.nat_IDJ1
        this.nat_idj2 = match.nat_IDJ2
        this.annee = this.get_annee(match.IDEDITION);
        this.tourString = this.get_tour(match.Tour)
    }

     /**
     * Récupère le score formaté x/x - x/x 
     * @param { string[] } score
     * @return { string }
     */
    get_valid_set(score:string[]):__scoreSorted{
        // On enlève les sets vides
        var filterSet = get_filtered_set(score);
            for (var i = 0; i < filterSet.length; i+=2){ 
                //Si c'est le dernier set on rajoute pas de "-" 
              if (i === filterSet.length - 2){
                this.score_sorted.idj1 += filterSet[i] + "/" + filterSet[i+1];
                this.score_sorted.idj2 += filterSet[i+1] + "/" + filterSet[i];
              }
              else{
                this.score_sorted.idj1 += filterSet[i] + "/" + filterSet[i+1] + " - ";
                this.score_sorted.idj2 += filterSet[i+1] + "/" + filterSet[i] + " - ";
              }
            }
        return this.score_sorted;
    }

    /**
     * Récupère noms d'un joueur avec son id 
     * @param { string } prenom
     * @param { string } nom
     * @return { string }
     */
    get_fullName_idj1(prenom:string, nom:string):string{
        return nom + ' ' + prenom;
    }
    get_fullName_idj2(prenom:string, nom:string):string{
        return nom + ' ' + prenom;
    }

    /**
     * Récupère les infos du vainq d'un match 
     * @param { __match } match
     * @return { string }
     */
    get_infos_vainq(match:__match):any{
        if (match.VAINQ === match.IDJ1){
        return {nom:match.nom_IDJ1, prenom:match.prenom_IDJ1, nat:match.nat_IDJ1, score:this.score_sorted.idj1, id:match.IDJ1}
        }
        else{
            return {nom:match.nom_IDJ2, prenom:match.prenom_IDJ2, nat:match.nat_IDJ2, score:this.score_sorted.idj2, id:match.IDJ2};
        }
    }
    get_infos_looser(match:__match):any{ 
        if (match.VAINQ === match.IDJ2){
            return {nom:match.nom_IDJ1, prenom:match.prenom_IDJ1, nat:match.nat_IDJ1, score:this.score_sorted.idj1, id:match.IDJ1}
            }
            else{
                return {nom:match.nom_IDJ2, prenom:match.prenom_IDJ2, nat:match.nat_IDJ2, score:this.score_sorted.idj2, id:match.IDJ2};
            }
    }

    /**
     * Récupère l'année depuis une idEdition 
     * @param { __match } match
     * @return { string }
     */
    get_annee(idedition:number){ 
        if (idedition <= 52){
            return (2020 - idedition);
        }
        return idedition + 1968;
    }

    // Récupère le tour en string
    get_tour(tour:number){ 
        return tourToString(tour)
    }
}

export default Match;