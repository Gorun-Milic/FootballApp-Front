export class Playerclubdto {
    playerclubid: number
    playerid: number
    clubid: number

    constructor(playerclubid: number, playerid: number, clubid: number) {
        this.playerclubid = playerclubid;
        this.playerid = playerid;
        this.clubid = clubid
    }
}