export class Clubdto {
    constructor(
        public clubid: number,
        public name: string, 
        public value: number, 
        public leagueid: number, 
        public stadiumid: number, 
        public imgUrl: string, 
        public password: string,
    ){}
}