import React, { useState } from "react";

const Balance = () => {
  const [bal, setBal] = useState(0);

  const onBalance = async (e) => {
    e.preventDefault();

    const acId = e.target.acId.value;

    console.log(`Id ${acId}`);

    try {
      const response = await fetch(`http://localhost:3100/balance/${acId}`);

      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setBal(json.bal);
    } catch (error) {
      console.error("Error:", error);
      // Optionally handle error state here, e.g., display an error message to the user
      setBal("An error occurred while retrieving the balance.");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4 md:mt-16">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onBalance}>
        <div className="mb-4">
          <h4>
            Balance: <p className="font-bold">{bal}</p>{" "}
          </h4>
        </div>
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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Check Balance
          </button>
        </div>
      </form>
    </div>
  );
};

export default Balance;
