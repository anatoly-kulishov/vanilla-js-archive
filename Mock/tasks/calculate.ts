type BetStrategy = {
    isDoubled: boolean;
    value: number;
    calc(k: number): number;
    more: boolean;
}

// Теперь BetEntity может расширять BetStrategy с дополнительными свойствами
type BetEntity = BetStrategy & {
    readonly id?: string;
    timestamp?: number;
}

const bet1: BetStrategy = {
    isDoubled: true,
    value: 5,
    more: true,
    calc(v: number): number {
        return this.isDoubled ? v * 2 : v;
    }
}

const bet2: BetStrategy = {
    isDoubled: false,
    value: 10,
    more: false,
    calc(v: number): number {
        return this.more ? v : -v;
    }
}

function calculate(bet: BetStrategy): number {
    return bet.calc(bet.value);
}

console.log(calculate(bet1)); // 10 (5 * 2 так как isDoubled: true)
console.log(calculate(bet2)); // -10 (так как more: false)

bet1.value = 10; // теперь следующий вызов calculate(bet1) вернет 20

