import React from "react";
import {
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaSignInAlt,
  FaChartPie,
  FaQuoteLeft,
} from "react-icons/fa";
import { VscDiffModified } from "react-icons/vsc";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const PrivateSection = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-center">
            Track Your Expenses Effortlessly
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-xl text-center">
            Manage your finances with a modern solution designed for you.
          </p>

          {/* Feature Icons */}
          <div className="flex space-x-8 mt-10">
            <div className="flex flex-col items-center">
              <FaMoneyBillWave className="text-3xl" />
              <p className="mt-2">Efficient Tracking</p>
            </div>
            <div className="flex flex-col items-center">
              <FaFilter className="text-3xl" />
              <p className="mt-2">Transactions Filtering</p>
            </div>
            <div className="flex flex-col items-center">
              <IoIosStats className="text-3xl" />
              <p className="mt-2">Insightful Reports</p>
            </div>
          </div>
        </div>
      </div>
      {/* How it works */}
      <div className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          How It Works
        </h2>
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-blue-500 text-white mb-4">
              <FaSignInAlt className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">Add Transactions</h3>
            <p>Quickly add income and expenses to your account.</p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-green-500 text-white mb-4">
              <VscDiffModified className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">
              Update and Delete Transactions
            </h3>
            <p>
              Easily modify or remove transactions to keep your financial
              records accurate and up to date.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-yellow-500 text-white mb-4">
              <FaChartPie className="text-xl" />
            </div>
            <h3 className="mb-2 font-semibold">View Reports</h3>
            <p>See insightful reports & graphs of your finances.</p>
          </div>
        </div>
      </div>
      {/* Expense Management Tips */}
      <div className="bg-gray-100 py-20 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Smart Expense Management Tips
        </h2>
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Track Every Expense</h3>
            <p className="mt-4">
              Keep a habit of logging every transaction, no matter how small.
              Small expenses add up quickly!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Set Monthly Budgets</h3>
            <p className="mt-4">
              Define a spending limit for different categories like food,
              travel, and entertainment to stay on track.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateSection;
