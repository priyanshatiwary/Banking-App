class Bank {
    static id = 0
    static bank = []
    // Constructor to create a new bank instance
    constructor(fullName, Abbreviation) {
        this.id = Bank.id++
        this.fullName = fullName
        this.Abbreviation = Abbreviation
    }
    // Method to create a new bank and add it to the bank array
    static createBank(fullName, abbreviation) {
        if (typeof fullName != 'string') {
            throw new Error('Invalid Value Of Name')
        }
        let bank = new Bank(fullName, abbreviation)
        // Add the new bank instance to the bank array
        let newbank = Bank.bank.push(bank)
        return newbank
    }
    // Method to retrieve all bank instances
    static getAllBank() {
        return Bank.bank // Return the array of bank instances
    }
    // Private method to find a bank instance by its ID
    static #findBank(bankID) {
        for (let index = 0; index < Bank.bank.length; index++) {
            if (bankID == Bank.bank[index].id) {
                return [Bank.bank[index], index]
            }
        }
        return [null, -1]
    }
    // Method to update the name of a bank instance
    updateName(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid Value of Name')
        }
        this.fullName = newValue
    }
    // Method to update the abbreviation of a bank instance
    updateAbbrevation(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid Value of Abbreviation')
        }
        this.Abbrevation = newValue
    }

    // Method to update bank information based on parameters
    static updateBank(bankID, parameter, newValue) {
        if (typeof bankID != 'number') {
            throw new Error('Invalid Bank ID')
        }
        if (typeof parameter != 'string') {
            throw new Error('Invalid Value of Parameter')
        }
        if (typeof newValue != 'string') {
            throw new Error('Invalid Value')
        }
        // Find the bank instance and update its information
        let [FoundBank, indexOfFoundBank] = Bank.#findBank(bankID)
        if (FoundBank == null) {
            throw new Error('Bank Not Found')
        }

        switch (parameter) {
            case 'fullName':
                FoundBank.updateName(newValue)
                break
            case 'abbreviation': 
                FoundBank.updateAbbreviation(newValue)
                break
            default:
                throw new Error('Parameter Does Not Exist')
        }
    }
    // Method to delete a bank instance from the bank array
    static deleteBank(bankID) {
        if (typeof bankID != 'number') {
            throw new Error('Invalid Bank ID')
        }
        // Find the bank instance and remove it from the array
        let [FoundBank, indexOfFoundBank] = Bank.#findBank(bankID)

        if (indexOfFoundBank == -1) {
            throw new Error('Bank Not Found')
        }
        Bank.bank.splice(indexOfFoundBank, 1)
    }
    // Method to create an account for a bank
    static createAccount(bankID) {
        if (typeof bankID != 'number') {
            throw new Error('Invalid Bank ID')
        }
        // Find the bank instance by ID
        let [FoundBank, indexOfFoundBank] = Bank.#findBank(bankID)
        if (FoundBank == null) {
            throw new Error('Bank Not found') 
        }

        return FoundBank.fullName // Return the bank's full name

    }


}

module.exports = Bank