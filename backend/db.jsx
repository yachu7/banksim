let localMemoryStorage = {};

const getItem = (key) => localMemoryStorage[key] || null;
const setItem = (key, value) => localMemoryStorage[key] = value;

// Utility function to get account data from localStorage or memory
const getAccounts = () => {
    const accounts = getItem('accounts');
    return accounts ? JSON.parse(accounts) : {};
};

// Utility function to set account data in localStorage or memory
const setAccounts = (accounts) => { 
    setItem('accounts', JSON.stringify(accounts));
};

// Create a new account and store it in memory/localStorage
const createNewAccount = ({ acId, acNm, acEmail, balance }, onCreate = undefined) => {
    const accounts = getAccounts();
    if (accounts[acId]) {
        console.log(`\n  Account already exists.`);
        return;
    }

    accounts[acId] = { acId, acEmail, acNm, balance: parseFloat(balance) };
    setAccounts(accounts);
    console.log(`\n  New Customer Created Successfully`);
    
    if (onCreate) onCreate(` New Customer Created Successfully`);
};

// Withdraw an amount from an account
const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
    const accounts = getAccounts();

    if (!accounts[acId]) {
        console.log(`\n  Account not found.`);
        return;
    }

    const account = accounts[acId];
    const balance = parseFloat(account.balance);

    if (balance < amount) {
        console.log(`\n  Insufficient balance.`);
        return;
    }

    account.balance = balance - parseFloat(amount);
    setAccounts(accounts);
    console.log(`\n  Amount ${amount} Withdrawn Successfully`);

    if (onWithdraw) onWithdraw(` Amount ${amount} Withdrawn Successfully`);
};

// Deposit an amount into an account
const deposit = ({ acId, amount }, onDeposit = undefined) => {
    const accounts = getAccounts();

    if (!accounts[acId]) {
        console.log(`\n  Account not found.`);
        return;
    }

    const account = accounts[acId];
    const balance = parseFloat(account.balance);
    account.balance = balance + parseFloat(amount);
    setAccounts(accounts);
    
    console.log(`\n  Amount ${amount} Deposited Successfully`);
    if (onDeposit) onDeposit(` Amount ${amount} Deposited Successfully`);
};

// Transfer amount from one account to another
const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
    withdraw({ acId: srcId, amount }, (msgWd) => {
        deposit({ acId: destId, amount }, (msgDp) => {
            console.log(`\n  Amount ${amount} Transferred Successfully`);
            if (onTransfer) onTransfer(` Amount ${amount} Transferred Successfully`);
        });
    });
};

// Get account balance
const balance = (acId, onBalance = undefined) => {
    const accounts = getAccounts();

    if (!accounts[acId]) {
        console.log(`\n  Account not found.`);
        return;
    }

    const account = accounts[acId];
    const balance = parseFloat(account.balance);
    
    console.log(`\n  Your Account Balance Is: ${balance}`);
    if (onBalance) onBalance(balance);
};

// Export the functions
module.exports = {
    createNewAccount, deposit, withdraw, transfer, balance
};
