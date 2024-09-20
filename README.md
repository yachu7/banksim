# Bank App

It is a program using React JS that simulates a bank account.

## Installation

Clone the repository and go to the project folder:
```bash
git clone https://github.com/yachu7/banksim.git
cd banksim
```
Use the package manager pip to install dependencies.

```bash
npm install 
```

Packages that you are installing:
```bash
Tailwind
React DOM Router
Express
Node-localStorage
cors
```
### Note:
Here I've used node-localStorage instead of localStorage because it was running in non-browser environment that is server side in Node Js.Local files are stored in ./backend/scratch/



To run the frontend :
```bash
npm run dev
```
To run the back-end :
First go to the directory "backend" in the project folder and run 
```bash
cd backend
node app.jsx
```
Backend Server is running on http://localhost:3100

# Project Overview
The project aims to build a simple web-based banking system that allows users to interact with their accounts by checking their balance, creating account, making deposits, and withdrawing funds. It includes both a front-end user interface and a back-end server for handling API requests related to account management.

## Key Features:

Create New Account: Users can create new account and get their account ID.

Check Account Balance:
Users can input their account ID to retrieve the current balance. 

Deposit Funds:
Users can input their account ID and deposit a specified amount of money into their account.

Withdraw Funds:
Users can withdraw a specified amount from their account, provided that they have sufficient funds.

### Note:
When creating an account copy the accound ID to deposit, withdraw or check balance.
 


 
