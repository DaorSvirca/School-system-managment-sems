"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = Cookies.get("userId");
    const userRole = Cookies.get("userRole");

    if (!userId || !userRole) {
      router.push("/login");
      return;
    }

    // Redirect based on user role
    switch (userRole.toUpperCase()) {
      case "SUPER_ADMIN":
      case "ADMIN":
        router.push("/admin");
        break;
      case "SUPER_ADMIN":
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
  }, [router]);
};

export default useAuthRedirect;
