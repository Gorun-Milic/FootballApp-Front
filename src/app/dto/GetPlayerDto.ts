import { Club } from "../model/Club";

export class GetPlayerDto {
    constructor(public playerid: number, 
        public assists: number, 
        public goals: number, 
        public position: string, 
        public imgurl: string, 
        public name: string,
        public surname: string, 
        public foot: string, 
        public height: number, 
        public club: Club, 
        public img: any,
        public value: number,
        public dateofbirth: Date){}
}