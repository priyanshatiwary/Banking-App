const Customer = require("./Customer");
console.log('=========Creating an admin instance using the newAdmin method================')
let admin = Customer.newAdmin('Priyansha', 'Tiwary')
console.log(admin)
console.log('===============Creating customer instances using the newCustomer method==============')
let customer1 = admin.newCustomer('Richa', 'Singh')
let customer2 = admin.newCustomer('Nikita', 'Patil')
let customer3 = admin.newCustomer('Manisha','Sharma')
let customer4 = admin.newCustomer('Neha','Gupta')
console.log(admin.getAllCustomer());
console.log('===============Updating a customers firstName using the updateCustomer method==============')
admin.updateCustomer(2, 'firstName', 'Krupali')
console.log(admin.getAllCustomer());
console.log('==================Deleting a customer===============================')
admin.deleteCustomer(3)
console.log(admin.getAllCustomer());

console.log('======================Creating banks using the createBank method=======================')
admin.createBank('Bank Of India','BOI')
admin.createBank('State Bank of India','SBI')
admin.createBank('Bank Of Maharashtra','BOM')
console.log(admin.getAllBank());

console.log('=======================Updating a banks fullName using the updateBank method====================')
admin.updateBank(1, 'fullName', 'Bank of Maharashtra')
console.log(admin.getAllBank());


console.log('==========================Deleting a bank using the deleteBank method======================')
admin.deleteBank(1)
console.log(admin.getAllBank());


console.log('========================Creating accounts for customers================================')
customer1.createAccount(0)
customer1.createAccount(2)
customer2.createAccount(2)
console.log('=====================Displaying all accounts for customer1 and customer2===================')
console.log(customer1.getAllAccount())
console.log(customer2.getAllAccount())

customer1.deleteAccount(0)
console.log(customer1.getAllAccount())
console.log('==================Depositing money into customer accounts==============================')
customer1.deposit(1, 2000)
console.log(customer1.getAllAccount())

console.log('=====================Depositing and withdrawing money from customer accounts=================')
customer2.deposit(2, 3000)
console.log(customer2.getAllAccount())
customer2.withdraw(2, 500)
console.log(customer2.getAllAccount())


console.log('======================Transferring money between customer accounts======================')
customer1.transferTo(500, 1, 2, 2)
console.log(customer1.getAllAccount())
console.log(customer2.getAllAccount())


console.log('=============================Displaying passbook for a specific account========================')
console.log('===========================Customer 1 Passbook=================================================');
console.log(customer1.passbook(1));
console.log('===========================Customer 2 Passbook=================================================');
console.log(customer2.passbook(2));







