"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import axiosInstance from "@/store/axiosInstance";
import { Button } from "@nextui-org/react";
import { getUser } from "@/store/userHelper";

type SemesterType = {
  semesterId: number;
  semesterName: string;
  orientation: string;
};

const SemestersListPage = () => {
  const [semesters, setSemesters] = useState<SemesterType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const router = useRouter(); 
  const [userRole, setUserRole] = useState<string | null>(null); 

  const fetchSemesters = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/semesters");
      setSemesters(response.data);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = async () => {
    const user = await getUser();
    if (user) {
      setUserRole(user.role);
    }
  };

  useEffect(() => {
    fetchSemesters();
    checkUserRole();
  }, []);

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0 ">
    
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-gray-800">All Semesters</h1>
        {userRole === "ADMIN" && (
          <Button color="primary" onPress={() => setIsAddModalOpen(true)}>
            Add Semester
          </Button>
        )}
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading semesters...</p>
        ) : semesters.length > 0 ? (
          semesters.map((semester) => (
            <div
              key={semester.semesterId}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-md text-white"
            >
              <h2 className="text-xl font-semibold">{semester.semesterName}</h2>
              <p className="text-gray-200 mt-2">
                Orientation: {semester.orientation}
              </p>
              <div className="mt-4">
                <Button
                  color="default"
                  className="bg-white rounded-3xl text-blue-600"
                  onPress={() =>
                    router.push(`/list/semesters/${semester.semesterId}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No semesters found.</p>
        )}
      </div>
    </div>
  );
};

export default SemestersListPage;
