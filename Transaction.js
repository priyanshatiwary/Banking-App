class Transaction {
    static id = 0
    constructor(date, amount, senderID, receiverID, transactionType, currentBalance) {
        this.transactionid = Transaction.id++
        this.date = date
        this.amount = amount
        this.senderID = senderID
        this.receiverID = receiverID
        this.transactionType = transactionType
        this.currentBalance = currentBalance

    }

    static createTransaction(date, amount, senderID, receiverID, transactionType, currentBalance) {
        return new Transaction(date, amount, senderID, receiverID, transactionType, currentBalance)
    }



}

module.exports = Transaction