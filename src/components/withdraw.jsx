import React, { useState } from "react";

const Withdraw = () => {
  const [message, setMessage] = useState(""); // State to store the message
  const onWithdraw = async (e) => {
    e.preventDefault();
  
    const acId = e.target.acId.value;
    const amount = e.target.amount.value;
  
    console.log(`Id ${acId} Amount ${amount}`);
  
    try {
      const response = await fetch("http://localhost:3100/withdraw", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acId, amount }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const json = await response.json();
      console.log(json);
  
      // Ensure msg is a string before setting the state
      const responseMessage = typeof json.msg === 'string' ? json.msg : "Insufficient Balance";
  
      setMessage(responseMessage);
  
      // Clear the message after 2 seconds
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred while processing the withdrawal.");
    }
  };
  
  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      {/*  Display message in the UI */}
      {message && <div className="m-4 text-green-500">{message}</div>}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onWithdraw}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="acId">
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
            htmlFor="withdrawAmount">
            Withdraw Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="withdrawAmount"
            type="number"
            placeholder="Enter Amount to Withdraw"
            name="amount"
            min="0"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Withdraw
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
