const Transaction = require("./Transaction")

class Account {

    static accountNo = 0
    // Constructor to create a new account
    constructor(bankName, bankBalance) {
        this.accountNo = Account.accountNo++
        this.bankName = bankName
        this.bankBalance = bankBalance
        this.passbook = []
    }
    // Method to create a new account instance
    static createAccount(name, minimumBalance) {
        return new Account(name, minimumBalance)
    }
    // Method to create a transaction and add it to passbook
    createTransaction(date, amount, senderID, receiverID, transactionType, currentBalance) {
        try {
            if (typeof transactionType != 'string' && transactionType != 'deposit' && transactionType != 'withdraw' && transactionType != 'transfer') {
                throw new Error('Invalid Transcation Type')
            }
            if (typeof currentBalance < 0) {
                throw new Error('Balance is Insufficient')
            }
            // Create a new transaction instance
            let transaction = Transaction.createTransaction(date, amount, senderID, receiverID, transactionType, currentBalance)

            return transaction // Return the created transaction
        } catch (error) {
            console.log(error.message);
        }
    }
    // Method to deposit money into the account
    deposit(amount, accountNo) {

        this.bankBalance = this.bankBalance + amount
        // Create a deposit transaction and add it to the passbook
        let depositTransaction = this.createTransaction(new Date(), amount, accountNo, accountNo, 'deposit', this.bankBalance)
        this.passbook.push(depositTransaction)
    }
    // Method to withdraw money from the account
    withdraw(amount, accountNo) {
        if (this.bankBalance <= 1500) {
            throw new Error('Withdrawal failed!!! Minimum balance must be more than 1500')
        }
        this.bankBalance = this.bankBalance - amount
        // Create a withdraw transaction and add it to the passbook
        let withdrawTransaction = this.createTransaction(new Date(), amount, accountNo, accountNo, 'withdraw', this.bankBalance)
        this.passbook.push(withdrawTransaction)
    }
    // Method to send money to another account
    send(amount, senderID, receiverID) {
        if (this.bankBalance <= 1500) {
            throw new Error('Transfer failed!!! Minimum balance must be more than 1500')
        }
        this.bankBalance = this.bankBalance - amount
        // Create a send transaction and add it to the passbook
        let sendTransaction = this.createTransaction(new Date(), amount, senderID, receiverID, 'transfer', this.bankBalance)
        this.passbook.push(sendTransaction)
    }
    // Method to receive money from another account
    receive(amount, senderID, receiverID) {
        this.bankBalance = this.bankBalance + amount
        // Create a receive transaction and add it to the passbook
        let recieveTransaction = this.createTransaction(new Date(), amount, senderID, receiverID, 'transfer', this.bankBalance)
        this.passbook.push(recieveTransaction)
    }


    getpassbook() {
        return this.passbook
    }


}

module.exports = Account