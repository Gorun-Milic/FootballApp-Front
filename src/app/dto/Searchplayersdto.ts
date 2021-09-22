export class Searchplayersdto {
    name: string
    surname: string
    position: string
    foot: string
    height: number

    constructor(name: string, surname: string, position: string, foot: string, height: number) {
        this.name = name
        this.surname = surname
        this.position = position
        this.foot = foot
        this.height = height
    }
}