import React, { useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");

  const onBalance = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await fetch(`http://localhost:3100/balance/${accountId}`);
      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance); // Assuming 'balance' is the key in the response
      } else {
        setError(data.error || "Error retrieving balance");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while retrieving the balance.");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onBalance}
      >
         <div className="mb-4">
            <h4>
              Balance: <p className="font-bold">{balance}</p>
            </h4>
          </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="acId"
          >
            Account Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="acId"
            type="text"
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Check Balance
          </button>
        </div>
      </form>

        
    </div>
  );
};

export default Balance;
