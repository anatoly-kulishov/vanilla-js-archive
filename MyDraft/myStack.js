class MyStack {
    constructor() {
        this.count = 0;
        this.storage = {};
    }

    push(val) {
        this.storage[this.count] = val;
        this.count++;
    }

    pop() {
        if (this.count === 0) {
            return undefined;
        }
        this.count--;
        delete this.storage [this.count];
    }

    top() {
        return this.storage[this.count - 1];
    }

    getMin() {
        if (this.count === 0) {
            return undefined;
        }
        let minValue = this.storage[this.count - 1];
        for (let i = 0; i < this.count; i++) {
            const current = this.storage[i];
            if (current < minValue) {
                minValue = current;
            }
        }
        return minValue;
    }
}

minStack = new MinStack();

minStack.push(-2);
minStack.push(0);
minStack.push(-3);

console.log(minStack.getMin()); // -3

minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2