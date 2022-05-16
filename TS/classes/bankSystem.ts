class Bank {
  private dictionary: {
    number: number;
  } | {};
  
  constructor(balance: number[]) {
    let accountIndex = 0;
    this.dictionary = {};
    
    balance.map(account => {
      this.dictionary[accountIndex + 1] = account;
      accountIndex++;
    });
  }
  
  transfer(account1: number, account2: number, money: number): boolean {
    return this.deposit(account2, money) && this.withdraw(account1, money);
  }
  
  deposit(account: number, money: number): boolean {
    if (!this.dictionary.hasOwnProperty(account)) return false;
    this.dictionary[account] = this.dictionary[account] + money;
    return true;
  }
  
  withdraw(account: number, money: number): boolean {
    if (!this.dictionary.hasOwnProperty(account) || this.dictionary[account] < money) return false;
    this.dictionary[account] = this.dictionary[account] - money;
    return true;
  }
  
  logAllBalance() {
    console.log(this.dictionary);
  }
}

const bank = new Bank([10, 100, 20, 50, 30]);

bank.logAllBalance(); // { '1': 10, '2': 100, '3': 20, '4': 50, '5': 30 }

console.log('Withdraw:', bank.withdraw(3, 50)); // false
console.log('Withdraw:', bank.withdraw(3, 5)); // true
console.log('Deposit:', bank.deposit(5, 100)); // true
console.log('Transfer:', bank.transfer(2, 1, 50)); // true

bank.logAllBalance(); // { '1': 60, '2': 50, '3': 15, '4': 50, '5': 130 }