export class Searchclubdto {
    name: string
    value: number
    leagueid: number

    constructor(name: string, value: number, leagueid: number) {
        this.name = name
        this.value = value
        this.leagueid = leagueid
    }
}