"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import FormInput from "@/components/input-field";
import { Button } from "@heroui/react";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectUser = (role: string) => {
    switch (role.toUpperCase()) {
      case "SUPER_ADMIN":
      case "ADMIN":
        router.push("/admin");
        break;
      case "PROFESSOR":
        router.push("/teacher");
        break;
      case "STUDENT":
        router.push("/student");
        break;
      default:
        router.push("/");
    }
  };

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    if (userRole) {
      redirectUser(userRole);
    }
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data,
        { withCredentials: true }
      );

      console.log("Response Data:", response.data);

      if (!response.data || !response.data.roleId?.roleName) {
        setErrorMessage("Invalid credentials. Please try again.");
        return;
      }

      const { userId, email, roleId } = response.data;
      const roleName = response.data.roleId.roleName;

      Cookies.set("userId", userId, { expires: 1 });
      Cookies.set("userEmail", email, { expires: 1 });
      Cookies.set("roleId", roleId.roleId, { expires: 1 });
      Cookies.set("userRole", roleName, { expires: 1 });

      redirectUser(roleName);
    } catch (error: any) {
      console.error("Login Error:", error);
      const message =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-2">{errorMessage}</p>
        )}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />

            <Button
              type="submit"
              color="primary"
              fullWidth
              isDisabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
