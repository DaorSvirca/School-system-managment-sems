"use client";

import useAuthRedirect from "./hooks/useAuthRedirect";

export default function HomePage() {
  useAuthRedirect(); // 🔥 Auto-redirects based on user role

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Welcome to SEMS</h1>
    </div>
  );
}
