"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/store/axiosInstance";
import { getUser } from "@/store/userHelper"; 
import { Button } from "@nextui-org/react";
import AddSubjectModal from "./_components/add-subject-modal";

type SubjectType = {
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
};

const gradientColors = [
  "from-green-400 to-teal-500",
  "from-blue-400 to-indigo-500",
  "from-pink-400 to-red-500",
  "from-yellow-400 to-orange-500",
  "from-purple-400 to-blue-500",
];

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); 
  const router = useRouter();

  useEffect(() => {
    fetchSubjects();
    checkUserRole(); 
  }, []);

 
  const checkUserRole = async () => {
    const user = await getUser();
    if (user) {
      setUserRole(user.role);
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md flex-1 m-4 mt-0">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">📚 All Subjects</h1>

    
        {userRole === "ADMIN" && (
          <Button
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all"
            onPress={() => setIsModalOpen(true)}
          >
            ➕ Add Subject
          </Button>
        )}
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading subjects...</p>
        ) : subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div
              key={subject.subjectId}
              className={`bg-gradient-to-br ${
                gradientColors[index % gradientColors.length]
              } p-6 rounded-xl shadow-lg text-white hover:scale-105 transition-transform`}
            >
              <h2 className="text-xl font-semibold">{subject.subjectName}</h2>
              <p className="text-gray-200 mt-2">{subject.subjectDescription}</p>
              <div className="mt-4">
                <Button
                  color="default"
                  className="bg-white text-gray-800 px-4 py-2 rounded-3xl hover:bg-gray-200 transition"
                  onPress={() =>
                    router.push(`/list/subjects/${subject.subjectId}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No subjects found.</p>
        )}
      </div>


      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchSubjects} 
      />
    </div>
  );
};

export default SubjectsPage;
