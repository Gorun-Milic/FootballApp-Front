export class Playerdto {

    constructor(public playerid: number,
                public assists: number, 
                public goals: number, 
                public position: string, 
                public imgUrl: string, 
                public name: string,
                public surname: string, 
                public foot: string, 
                public height: number, 
                public clubid: number, 
                public dateofbirth: string,
                public value: number) {}

}