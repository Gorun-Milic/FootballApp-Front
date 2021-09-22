import { Club } from "./Club";

export class Player {
    constructor(public playerid: number, 
                public assists: number, 
                public goals: number, 
                public position: string, 
                public imgurl: string, 
                public name: string,
                public surname: string, 
                public foot: string, 
                public height: number, 
                public clubid: number,
                public img: any,
                public value: number,
                public dateofbirth: Date){}
}