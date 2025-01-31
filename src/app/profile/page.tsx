"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUser } from "@/store/userHelper";
import { Spinner, Button } from "@heroui/react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);


  const handleLogout = () => {
 
    Cookies.remove("userId");
    Cookies.remove("userEmail");
    Cookies.remove("roleId");
    Cookies.remove("userRole");

    
    router.push("/login");
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getUser();
      if (!currentUser) {
     
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };

    fetchCurrentUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-gray-700">
          <span className="font-semibold">User ID:</span> {user.userId}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Role:</span> {user.role}
        </p>

        <Button onPress={handleLogout} color="danger" className="mt-4 w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}
