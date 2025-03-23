import React, { useEffect } from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import {
  updateProfileAPI,
  getUserProfileAPI,
} from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  // Fetch user profile data
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfileAPI,
  });

  // Mutation for updating user profile
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
    // onSubmit: (values) => {
    //   mutateAsync(values)
    //     .then((data) => console.log(data))
    //     .catch((e) => console.log(e));
    // },
  });

  // Populate form fields when userData is available
  useEffect(() => {
    if (userData) {
      formik.setValues({
        email: userData.email || "",
        username: userData.username || "",
      });
    }
  }, [userData]); // Runs when userData changes

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      {/* Welcome message with username */}
      <h1 className="mb-2 text-2xl text-center font-extrabold">
        Welcome{" "}
        {isLoading ? (
          <span className="text-gray-500 text-lg">Loading...</span>
        ) : isError ? (
          <span className="text-red-500 text-lg">Error</span>
        ) : (
          <span className="text-blue-600">{userData?.username}</span>
        )}
      </h1>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Update Profile
      </h3>

      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Updating..." />}
      {isSuccess && (
        <AlertMessage type="success" message="Updated successfully" />
      )}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message || "Failed to fetch user data"
          }
        />
      )}

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              {...formik.getFieldProps("username")}
              type="text"
              id="username"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-3xl text-gray-400" />
          <div className="flex-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
      <UpdatePassword />
    </div>
  );
};

export default UserProfile;
