import React, { useState } from "react";

const Create = () => {
  const [message, setMessage] = useState(""); // State to store the message

  const onNewCustomer = async (e) => {
    e.preventDefault();

    const acEmail = e.target.acEmail.value;
    const acNm = e.target.acNm.value;
    const balance = e.target.balance.value;

    console.log(`email ${acEmail} Name ${acNm} Bal ${balance}`);

    try {
      const response = await fetch("http://localhost:3100/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acNm, acEmail, balance }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json);
      const responseMessage = json.msg || "Error";

      setMessage(responseMessage);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while creating the new customer.");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      {/*  Display message in the UI */}
      {message && <div className="m-4 text-green-500">{message}</div>}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onNewCustomer}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Account Name"
            name="acNm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="acEmail"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deposit">
            Initial Deposit
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deposit"
            type="number"
            placeholder="Initial Deposit"
            name="balance"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
