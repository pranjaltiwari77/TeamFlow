import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCredentials } from "../features/auth/authslice";
import { loginUser } from "../services/auth.service";

import { useForm } from "react-hook-form";


function Login() {
    const dispatch = useDispatch();
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const response = await loginUser(data);
  
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );
  
      navigate("/dashboard");
  
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl">

        <h1 className="text-3xl text-center font-bold text-white mb-2">
          TeamFlow
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Welcome Back
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-5"
        >

          <div>
            <label className="text-white">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            />
          </div>

          <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
>
  Login
</button>

        </form>

      </div>

    </div>
  );
}

export default Login;