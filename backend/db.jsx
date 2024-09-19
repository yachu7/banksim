const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch"); // './scratch' is the directory where storage will be kept

// Utility function to get account data from localStorage
const getAccounts = () => {
  const accounts = localStorage.getItem("accounts");
  return accounts ? JSON.parse(accounts) : {}; // Return parsed accounts or an empty object
};

// Utility function to set account data in localStorage
const setAccounts = (accounts) => {
  localStorage.setItem("accounts", JSON.stringify(accounts)); // Save accounts back to localStorage
};

// Utility function to generate a random account ID
const generateRandomAccountId = () => {
  return "AC" + Math.floor(Math.random() * 1000000) + Date.now();
};

// Create a new account and store it in localStorage
const createNewAccount = ({ acNm, acEmail, balance }, onCreate = undefined) => {
  const accounts = getAccounts();

  // Generate a random and unique account ID
  const acId = generateRandomAccountId();

  // Check if the generated account ID already exists
  if (accounts[acId]) {
    console.log(`\n  Account already exists.`);
    return;
  }

  // Create the new account and save it
  accounts[acId] = { acId, acEmail, acNm, balance: parseFloat(balance) };
  setAccounts(accounts);
  console.log(`\n  New Customer Created Successfully with ID: ${acId}`);

  // If an onCreate callback is provided, invoke it
  if (onCreate) onCreate(` New Customer Created Successfully with ID: ${acId}`);
};

// Withdraw an amount from an account
const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
  const accounts = getAccounts();

  if (!accounts[acId]) {
    if (onWithdraw) onWithdraw("Account Not Found.");
    return;
  }

  const account = accounts[acId];
  const balance = parseFloat(account.balance);

  if (balance < amount) {
    if (onWithdraw) onWithdraw("Insufficient balance.");
    return;
  }

  account.balance = balance - parseFloat(amount);
  setAccounts(accounts);
  console.log(
    `\n  Amount ${amount} Withdrawn Successfully from Account ID: ${acId}`
  );

  if (onWithdraw)
    onWithdraw(
      ` Amount ${amount} Withdrawn Successfully from Account ID: ${acId}`
    );
};

// Deposit an amount into an account
const deposit = ({ acId, amount }, onDeposit = undefined) => {
  const accounts = getAccounts(); // Assuming this retrieves all accounts

  if (!accounts[acId]) {
    console.log(`\n  Account not found.`);
    return;
  }

  const account = accounts[acId];
  const balance = parseFloat(account.balance);
  account.balance = balance + parseFloat(amount);
  setAccounts(accounts); // Assuming this saves the updated accounts

  console.log(
    `\n  Amount ${amount} Deposited Successfully into Account ID: ${acId}`
  );
  if (onDeposit)
    onDeposit(
      ` Amount ${amount} Deposited Successfully into Account ID: ${acId}`
    );
};

// Get account details
const balance = (acId, onBalance = undefined) => {
    const accounts = getAccounts();
  
    if (!accounts[acId]) {
      console.log(`\n  Account not found.`);
      if (onBalance) onBalance({ error: "Account not found" });
      return;
    }
  
    const account = accounts[acId];
    const balance = parseFloat(account.balance);
    const accountName = account.acNm || "N/A"; // Assuming 'acNm' is the account name
  
    console.log(`\n  Account Name: ${accountName}`);
    console.log(`\n  Account Balance: ${balance}`);
    
    // Provide both balance and account name
    if (onBalance) onBalance({ balance, accountName });
  };
  

// Export the functions
module.exports = {
  createNewAccount,
  deposit,
  withdraw,
  balance,
};
