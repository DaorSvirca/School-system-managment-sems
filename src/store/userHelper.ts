import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

export const getUser = async () => {
  // 1️⃣ Try to get user details from cookies first
  const userId = Cookies.get("userId");
  const userEmail = Cookies.get("userEmail");
  const roleId = Cookies.get("roleId");
  const userRole = Cookies.get("userRole");

  if (userId && userEmail && roleId && userRole) {
    return {
      userId,
      email: userEmail,
      roleId,
      role: userRole,
    };
  }

  // 2️⃣ If cookies are missing, fetch user details from API
  try {
    const response = await axiosInstance.get("/auth/user");
    const user = response.data;

    // 3️⃣ Store user data in cookies for future use
    Cookies.set("userId", user.userId, { expires: 1 });
    Cookies.set("userEmail", user.email, { expires: 1 });
    Cookies.set("roleId", user.roleId.roleId, { expires: 1 });
    Cookies.set("userRole", user.roleId.roleName, { expires: 1 });

    return {
      userId: user.userId,
      email: user.email,
      roleId: user.roleId.roleId,
      role: user.roleId.roleName,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null if user is not authenticated
  }
};
