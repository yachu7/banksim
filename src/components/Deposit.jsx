import React, { useState, useEffect } from "react";

const Deposit = () => {
  const [message, setMessage] = useState(""); // State to store the message
  const [accountExists, setAccountExists] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [checking, setChecking] = useState(false); // State to manage checking account status

  useEffect(() => {
    const checkAccountExists = async (acId) => {
      try {
        const response = await fetch(`http://localhost:3100/account/${acId}`);
        const json = await response.json();
        console.log("Account exists response:", json); // Debugging response

        if (json.exists) {
          // Fetch account details if the account exists
          const balanceResponse = await fetch(
            `http://localhost:3100/balance/${acId}`
          );
          const balanceJson = await balanceResponse.json();
          console.log("Balance response:", balanceJson); // Debugging response

          if (!balanceJson.error) {
            setAccountExists(true);
            setAccountDetails({
              acId,
              balance: balanceJson.balance,
              acNm: balanceJson.accountName,
            });
          } else {
            setAccountExists(false);
            setAccountDetails(null); // Clear account details if there is an error
          }
        } else {
          setAccountExists(false);
          setAccountDetails(null); // Clear account details if not exists
        }
        setChecking(false); // Reset checking status
      } catch (error) {
        console.error("Error checking account:", error);
        setChecking(false); // Reset checking status on error
      }
    };

    if (checking && accountId) {
      checkAccountExists(accountId);
    }
  }, [checking, accountId]);

  const handleAccountChange = (e) => {
    setAccountId(e.target.value);
  };

  const handleCheckAccount = (e) => {
    e.preventDefault();
    setChecking(true); // Start checking account status
  };

  const onDeposit = async (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    console.log(`Depositing amount ${amount} to account ID ${acId}`);

    try {
      const response = await fetch("http://localhost:3100/deposit", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acId, amount }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("Deposit response:", json); // Debugging response
      setMessage(json.msg || "Deposit successful");

      // Fetch updated account details to reflect changes
      const balanceResponse = await fetch(
        `http://localhost:3100/balance/${acId}`
      );
      const balanceJson = await balanceResponse.json();
      if (!balanceJson.error) {
        setAccountDetails({
          acId,
          balance: balanceJson.balance,
          acNm: balanceJson.accountName,
        });
      }
      console.log("Updated account details:", accountDetails);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error during deposit:", error);
      setMessage("An error occurred while processing the deposit.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      {message && <div className="m-4 text-green-500">{message}</div>}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleCheckAccount}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="accountId">
            Account Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="accountId"
            type="text"
            placeholder="Account ID"
            value={accountId}
            onChange={handleAccountChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Check Account
          </button>
        </div>
      </form>

      {accountExists && accountDetails && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Account Name
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
              {accountDetails.acNm || "N/A"}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Account Balance
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
              {`${accountDetails.balance || "0"}`}
            </div>
          </div>

          <form onSubmit={onDeposit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="depositAmount">
                Deposit Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="depositAmount"
                type="number"
                placeholder="Enter Amount to Deposit"
                name="amount"
                min="0"
              />
            </div>

            <input type="hidden" name="acId" value={accountId} />

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Deposit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Deposit;
