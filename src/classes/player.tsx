export interface __player{
    NOM: string, 
    PRENOM:string, 
    IDJOUEUR:number,
    NAT:string
}

class Player{
    player_id; player_nom; player_prenom; player_nat;
    constructor(player:__player){
        this.player_id = player.IDJOUEUR;
        this.player_nom = player.NOM;
        this.player_prenom = player.PRENOM;
        this.player_nat = player.NAT;
    }
}   

export default Player