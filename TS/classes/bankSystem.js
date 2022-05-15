var Bank = /** @class */ (function () {
    function Bank(balance) {
        var _this = this;
        var accountIndex = 0;
        this.dictionary = {};
        balance.map(function (account) {
            _this.dictionary[accountIndex + 1] = account;
            accountIndex++;
        });
    }
    Bank.prototype.transfer = function (account1, account2, money) {
        if (!this.dictionary.hasOwnProperty(account1) || this.dictionary[account1] < money)
            return false;
        if (!this.dictionary.hasOwnProperty(account2))
            return false;
        return this.deposit(account2, money) && this.withdraw(account1, money);
    };
    Bank.prototype.deposit = function (account, money) {
        if (!this.dictionary.hasOwnProperty(account))
            return false;
        this.dictionary[account] = this.dictionary[account] + money;
        return true;
    };
    Bank.prototype.withdraw = function (account, money) {
        if (!this.dictionary.hasOwnProperty(account) || this.dictionary[account] < money)
            return false;
        this.dictionary[account] = this.dictionary[account] - money;
        return true;
    };
    return Bank;
}());
var bank = new Bank([10, 100, 20, 50, 30]);
console.log('Withdraw:', bank.withdraw(3, 50));
console.log('Deposit:', bank.deposit(5, 100));
console.log('Transfer:', bank.transfer(2, 1, 50));
