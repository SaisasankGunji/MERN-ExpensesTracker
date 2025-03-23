import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
      {isPending && <AlertMessage type="loading" message="Logging you in...." />}
      {isError && (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "Login failed"}
        />
      )}
      {isSuccess && <AlertMessage type="success" message="Login success" />}

      {/* Email Field */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
