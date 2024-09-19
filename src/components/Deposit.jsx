import React, { useState } from "react";

const Deposit = () => {
  const [message, setMessage] = useState(""); // State to store the message

  const onDeposit = (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;
    const amount = e.target.amount.value;

    console.log(`Id ${acId} Amount ${amount}`);

    fetch("http://localhost:3100/deposit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ acId, amount }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const responseMessage = json.msg || "Error";

        setMessage(responseMessage);
         // Clear the message after 3 seconds
         setTimeout(() => {
          setMessage('');
        }, 2000);
      });
  };
  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      {/*  Display message in the UI */}
      {message && <div className="m-4 text-green-500">{message}</div>}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onDeposit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="balance">
            Account Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="balance"
            type="text"
            placeholder="Account ID"
            name="acId"
          />
        </div>

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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Deposit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
