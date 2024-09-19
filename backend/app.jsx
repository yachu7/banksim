const express = require("express");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

const port = 3100;

const { createNewAccount, deposit, withdraw, balance } = require("./db.jsx");

const getAccounts = () => {
  const accounts = localStorage.getItem("accounts");
  return accounts ? JSON.parse(accounts) : {}; // Return parsed accounts or an empty object
};

app.get("/account/:acId", async (req, res) => {
  const { acId } = req.params;
  try {
    const accounts = getAccounts();
    if (accounts[acId]) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create", async (req, res) => {
  try {
    createNewAccount(req.body, (msg) => {
      res.json({ sts: "success", msg });
    });
  } catch (error) {
    console.error("Error creating new account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/withdraw", async (req, res) => {
  try {
    withdraw(req.body, (msg) => {
      res.json({ sts: "success", msg });
    });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/deposit", async (req, res) => {
  try {
    deposit(req.body, (msg) => {
      res.json({ sts: "success", msg });
    });
  } catch (error) {
    console.error("Error depositing funds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/balance/:acId", async (req, res) => {
    const { acId } = req.params;
    try {
      balance(acId, (result) => {
        if (result.error) {
          res.status(404).json({ error: result.error });
        } else {
          res.json(result); // Send the balance and account name
        }
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.listen(port, () => {
  console.log(`Banking App listening on port ${port}`);
});
