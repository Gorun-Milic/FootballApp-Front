import { League } from "./League";

export class Club {
    
    constructor(public clubid: number, 
                public imgurl: string, 
                public name: string, 
                public password: string, 
                public value: number, 
                public league: number, 
                public img: any) {}
}