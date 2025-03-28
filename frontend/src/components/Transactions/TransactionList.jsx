import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  listTransactionsAPI,
  deleteTransactionAPI,
} from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const TransactionList = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });
  const [dateError, setDateError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      filters.startDate &&
      filters.endDate &&
      filters.startDate > filters.endDate
    ) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [filters.startDate, filters.endDate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { data: categoriesData } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { data: transactions, refetch } = useQuery({
    queryFn: () => listTransactionsAPI(filters),
    queryKey: ["list-transactions", filters],
  });

  const handleUpdateTransaction = (id) => {
    navigate(`/update-transaction/${id}`);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransactionAPI(id);
      window.location.reload();
      refetch();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      {dateError && (
        <div className="mb-4">
          <AlertMessage
            type="error"
            message="Start date cannot be greater than end date"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Start Date */}
        <div className="space-y-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-semibold text-gray-900"
          >
            Starting Date
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className={`w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
              dateError ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-semibold text-gray-900"
          >
            Ending Date
          </label>
          <input
            id="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            type="date"
            name="endDate"
            className={`w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
              dateError ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* Type */}
        <div className="space-y-1">
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-900"
          >
            Type of Expense
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-900"
          >
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleFilterChange}
            name="category"
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="All">All Categories</option>
            <option value="Uncategorized">Uncategorized</option>
            {categoriesData?.map((category) => (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-start">
        <Link to="/add-transaction">
          <button className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition-shadow shadow-md hover:shadow-lg">
            Add a Transaction
          </button>
        </Link>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Filtered Transactions
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {transactions?.map((transaction) => (
            <li
              key={transaction._id}
              className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
            >
              <div>
                <span className="font-medium text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
                <span className="ml-2 text-gray-800">
                  {transaction.category} - ₹
                  {transaction.amount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 italic ml-2">
                  {transaction.description}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleUpdateTransaction(transaction._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTransaction(transaction._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
