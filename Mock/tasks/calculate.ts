type BetStrategy = {
    isDoubled?: boolean;
    value?: number;
    calc?(k: number): number;
    more: boolean
}

// change this
type BetEntity = BetStrategy

const bet1: BetStrategy = {
    isDoubled: true,
    value: 5,
    calc(v) {}
}

const bet2: BetStrategy = {
    isDoubled: false,
    value: 10,
    calc(v) {}
}

function calculate(bet) {
    return bet.calc(bet.value)
}

console.log(calculate(bet1)) // 10
console.log(calculate(bet2)) // -10

bet1.value = 10