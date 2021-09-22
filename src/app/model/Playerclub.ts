import { Player } from './Player';
import { Club } from './Club';

export class Playerclub {
    playerclubid: number
    player: Player
    club: Club

    constructor(playerclubid: number, player: Player, club: Club) {
        this.playerclubid = playerclubid;
        this.player = player;
        this.club = club;
    }
}