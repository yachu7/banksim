let localMemoryStorage = {};

const getItem = (key) => localMemoryStorage[key] || null;
const setItem = (key, value) => (localMemoryStorage[key] = value);

// Utility function to get account data from localStorage or memory
const getAccounts = () => {
  const accounts = getItem("accounts");
  return accounts ? JSON.parse(accounts) : {};
};

// Utility function to set account data in localStorage or memory
const setAccounts = (accounts) => {
  setItem("accounts", JSON.stringify(accounts));
};

// Utility function to generate a random account ID
const generateRandomAccountId = () => {
  return "AC" + Math.floor(Math.random() * 1000000) + Date.now();
};

// Create a new account and store it in memory/localStorage
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
    console.log(`\n  Account not found.`);
    return;
  }

  const account = accounts[acId];
  const balance = parseFloat(account.balance);

  if (balance < amount) {
    const msg = `\n  Insufficient balance.`;
    console.log(msg);
    if (onWithdraw)
      onWithdraw({ success: false, msg: "Insufficient balance." });
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
  createNewAccount,
  deposit,
  withdraw,
  balance,
};
