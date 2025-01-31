"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/store/axiosInstance";
import { getUser } from "@/store/userHelper"; // ✅ Import getUser function
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type SubjectType = {
  subjectId: number;
  subjectName: string;
};

type SemesterType = {
  semesterId: number;
  semesterName: string;
  orientation: string;
  subjects: SubjectType[];
};

const SemesterPage = () => {
  const { id } = useParams();
  const [semester, setSemester] = useState<SemesterType | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<SubjectType[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // ✅ Track user role

  useEffect(() => {
    fetchSemester();
    fetchAvailableSubjects();
    checkUserRole(); // ✅ Fetch and set user role
  }, [id]);

  // ✅ Fetch User Role
  const checkUserRole = async () => {
    const user = await getUser();
    if (user) {
      setUserRole(user.role);
    }
  };

  // Fetch semester details
  const fetchSemester = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/v1/semesters/${id}`);
      setSemester(response.data);
    } catch (error) {
      console.error("Error fetching semester:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all available subjects
  const fetchAvailableSubjects = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/subjects`);
      setAvailableSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Handle adding subject to semester
  const handleAddSubject = async () => {
    if (!selectedSubject) {
      alert("Please select a subject!");
      return;
    }

    try {
      await axiosInstance.put(
        `/api/v1/semesters/${id}/add-subject/${selectedSubject}`
      );
      setIsModalOpen(false);
      fetchSemester(); // Refresh semester subjects after adding
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg mt-6 bg-gradient-to-br from-blue-500 to-purple-600">
      {loading ? (
        <p className="text-center text-gray-500">Loading semester...</p>
      ) : semester ? (
        <>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {semester.semesterName}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">
                Orientation:{" "}
                <span className="font-semibold text-white">
                  {semester.orientation}
                </span>
              </p>
            </div>

       
            {userRole === "ADMIN" ||
              (userRole === "SUPER_ADMIN" && (
                <Button
                  onPress={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-gray-50 text-black px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Subject
                </Button>
              ))}
          </div>

   
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Subjects</h2>
            {semester.subjects.length > 0 ? (
              <div className="grid gap-4 mt-4">
                {semester.subjects.map((subject) => (
                  <div
                    key={subject.subjectId}
                    className="flex justify-between items-center bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-900">
                        {subject.subjectName}
                      </span>
                      <Link
                        href={`/list/subjects/${subject.subjectId}`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Subject Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                No subjects found for this semester.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">Semester not found.</p>
      )}

      {/* ADD SUBJECT MODAL */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} backdrop="blur">
        <ModalContent className="p-6 bg-white rounded-3xl shadow-lg border border-gray-200">
          <ModalHeader className="text-center text-xl font-semibold text-gray-800">
            📚 Add a Subject
          </ModalHeader>

          <ModalBody className="max-h-[60vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              {availableSubjects.map((subject) => (
                <button
                  key={subject.subjectId}
                  className={`p-4 rounded-xl border-2 transition-all text-lg font-medium ${
                    selectedSubject === subject.subjectId
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-600 shadow-lg"
                      : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-blue-100 hover:border-blue-400 transition"
                  }`}
                  onClick={() => setSelectedSubject(subject.subjectId)}
                >
                  {subject.subjectName}
                </button>
              ))}
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-between mt-4">
            <Button
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
              onPress={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={`px-6 py-2 text-white rounded-lg shadow-md transition ${
                selectedSubject
                  ? "bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed opacity-60"
              }`}
              onPress={handleAddSubject}
              disabled={!selectedSubject}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SemesterPage;
