const Account = require("./Accounts")
const Bank = require("./Bank")
class Customer {

    static newCustomer = [] // Array to store instances of customers
    static id = 0
    static minimumBalance = 1500 // Minimum balance requirement for accounts

    constructor(firstName, lastName, isAdmin) {
        this.id = Customer.id++
        this.account = []
        this.firstName = firstName
        this.lastName = lastName
        this.minimumBalance = Customer.minimumBalance
        this.isAdmin = isAdmin
    }

    static newAdmin(firstName, lastName) {

        try {
            if (typeof firstName != 'string') {
                throw new Error('Invalid input')
            }
            if (typeof lastName != 'string') {
                throw new Error('Invalid input')
            }

            return new Customer(firstName, lastName, true) // Create and return an admin instance
        } catch (error) {
            console.log(error.message);
        }
    }

    newCustomer(firstName, lastName) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            if (typeof firstName != 'string') {
                throw new Error('Invalid input')
            }
            if (typeof lastName != 'string') {
                throw new Error('Invalid input')
            }
            let newCustomer = new Customer(firstName, lastName, false) // Create a new customer instance
            Customer.newCustomer.push(newCustomer) // Add the customer to the list
            return newCustomer // Return the newly created customer

        } catch (error) {
            console.log(error.message);
        }
    }

    getAllCustomer() {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            return Customer.newCustomer // Return the list of all customers
        } catch (error) {
            console.log(error.message);
        }
    }
    #findCustomerID(customerID) {
        for (let index = 0; index < Customer.newCustomer.length; index++) {
            if (customerID == Customer.newCustomer[index].id) {
                return [Customer.newCustomer[index], index]
            }
        }
        return [null, null]

    }

    #updateFirstName(newValue, indexofCustomer) {
        if (typeof newValue != 'string') {
            throw new Error('New Content Should be in string format')
        }
        Customer.newCustomer[indexofCustomer].firstName = newValue

    }

    #updateLastName(newValue, indexofCustomer) {
        if (typeof newValue != 'string') {
            throw new Error('New Content Should be in string format')
        }
        Customer.newCustomer[indexofCustomer].lastName = newValue

    }

    updateCustomer(customerID, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            if (typeof customerID != 'number') {
                throw new Error('Enter valid input')
            }
            if (typeof parameter != 'string') {
                throw new Error('Enter valid input')
            }

            let [foundCustomer, indexofCustomer] = this.#findCustomerID(customerID)
            if (indexofCustomer == null) {
                throw new Error('Customer not found')
            }
            switch (parameter) {
                case 'firstName':
                    this.#updateFirstName(newValue, indexofCustomer)
                    break;
                case 'lastName':
                    this.#updateLastName(newValue, indexofCustomer)
                    break;
                default:
                    throw new Error('Parameter does not exist')
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteCustomer(customerID) {

        try {

            if (!this.isAdmin) {
                throw new Error('Only admins can delete customer')
            }
            if (typeof customerID != 'number') {
                throw new Error('Invalid Customer ID')
            }
            let [foundCustomer, indexofCustomer] = this.#findCustomerID(customerID)
            if (indexofCustomer == null) {
                throw new Error('Customer not found')
            }

            Customer.newCustomer.splice(indexofCustomer, 1)
        } catch (error) {
            throw new Error(error.message)
        }

    }
    // Method to create a new bank (admin only)
    createBank(fullname, abbreviation) {
        try {
            if (!this.isAdmin) {
                throw new Error('Only admin can create bank')
            }
            Bank.createBank(fullname, abbreviation) // Call Bank's createBank method

        } catch (error) {
            throw new Error(error.message)
        }


    }
  // Method to get all banks (admin only)
    getAllBank() {

        try {
            if (!this.isAdmin) {
                throw new Error('Only admin can access all banks')
            }

            return Bank.getAllBank() // Call Bank's getAllBank method

        } catch (error) {
            throw new Error(error.message)
        }
    }
    // Method to update a bank's information (admin only)
    updateBank(bankID, parameter, newValue) {

        try {
            if (!this.isAdmin) {
                throw new Error('Only admin can update Bank')
            }
            Bank.updateBank(bankID, parameter, newValue) // Call Bank's updateBank method
        } catch (error) {
            throw new Error(error.message)
        }

    }
    // Method to delete a bank (admin only)
    deleteBank(bankID) {
        try {
            if (!this.isAdmin) {
                throw new Error('Only admin can delete bank')
            }
            Bank.deleteBank(bankID) // Call Bank's deleteBank method
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createAccount(bankID) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can create Account')
            }
            // Find the bank associated with the bankID
            let bankfound = Bank.createAccount(bankID)
            // Create a new account using the bank information and minimum balance
            let account = Account.createAccount(bankfound, this.minimumBalance)
            // Add the created account to the customer's account array
            this.account.push(account)
            return account // Return the created account

        } catch (error) {
            throw new Error(error.message)
        }

    }
    // Method to get all customer's accounts
    getAllAccount() {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can access Account Info')
            }
            return this.account // Return the array of accounts
        } catch (error) {
            throw new Error(error.message)
        }
    }
    // Private method to find an account by its ID
    #findAccount(accountID) {
        for (let index = 0; index < this.account.length; index++) {
            if (accountID == this.account[index].accountNo) {
                return [this.account[index], index]
            }
        }
        return [null, -1]

    }

    deleteAccount(accountID) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can delete Account')
            }
            let [foundAccount, indexofAccount] = this.#findAccount(accountID)
            if (foundAccount == null) {
                throw new Error('Account not found')
            }
            // Remove the account from the customer's account array
            this.account.splice(indexofAccount, 1)

        } catch (error) {
            throw new Error(error.message)
        }
    }
    // Method to deposit money into an account
    deposit(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can deposit money')
            }
            if (typeof amount != 'number') {
                throw new Error('Invalid amount value')
            }

            let [foundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (foundAccount == null) {
                throw new Error('Account not found')
            }
            // Call deposit method on the account object
            foundAccount.deposit(amount, accountNo)
        } catch (error) {
            throw new Error(error.message)

        }
    }
    // Method to withdraw money from an account
    withdraw(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can withdraw money')
            }
            if (typeof amount != 'number') {
                throw new Error('Invalid value of amount')
            }

            let [foundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (foundAccount == null) {
                throw new Error('Account not found')
            }
             // Call withdraw method on the account object
            foundAccount.withdraw(amount, accountNo)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    // Method to transfer money between accounts
    transferTo(amount, senderID, receiverID, customerID) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can transfer money')
            }
            if (typeof amount != 'number') {
                throw new Error('Invalid value of amount')
            }
            // Find the customer and their accounts
            let [foundCustomer, indexofCustomer] = this.#findCustomerID(customerID)
            if (foundCustomer == null) {
                throw new Error('Customer not found')
            }
            // Find sender's and receiver's accounts
            let [senderAccount, indexofsender] = this.#findAccount(senderID)
            if (senderAccount == null) {
                throw new Error('Sender Account not found')
            }

            let [receiverAccount, indexofreceiver] = foundCustomer.#findAccount(receiverID)
            if (receiverAccount == null) {
                throw new Error('Receiver Account not found')
            }
            // Perform the transfer between accounts
            senderAccount.send(amount, senderID, receiverID)
            receiverAccount.receive(amount, senderID, receiverID)

        } catch (error) {
            throw new Error(error.message)
        }
    }
    // Method to access passbook for an account
    passbook(accountNo) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can have access to passbook')
            }

            let [foundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (foundAccount == null) {
                throw new Error('Account not found')
            }
            let passbookInfo = foundAccount.getpassbook()
            return passbookInfo // Return passbook information


        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = Customer