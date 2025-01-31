// Login.tsx
"use client"; // Add this to mark the component as a client component

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axiosInstance from "@/store/axiosInstance"; // Axios instance
import { getUser } from "@/store/userHelper"; // Import the user helper

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/login", data); // Send login request

      const user = await getUser(); // ✅ Fetch user after login

      if (!user || !user.role) {
        setError("Failed to determine user role.");
        return;
      }

      // ✅ Redirect based on role
      const roleBasedRoutes: Record<string, string> = {
        admin: "/admin",
        teacher: "/teacher",
        student: "/student",
      };

      router.push(roleBasedRoutes[user.role] || "/dashboard"); // Fallback to dashboard
    } catch (err) {
      console.error("Login error", err);
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-3">
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div> */}
      <h1>Hello</h1>
    </div>
  );
};

export default Login;
