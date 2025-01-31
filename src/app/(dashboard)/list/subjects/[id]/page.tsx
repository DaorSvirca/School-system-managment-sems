"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/store/axiosInstance";
import { getUser } from "@/store/userHelper"; // ✅ Import user helper
import { Button } from "@nextui-org/react";
import { PencilIcon, TrashIcon, ClockIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteSubjectModal from "../_components/delete-subject";
import UpdateSubjectModal from "../_components/update-subject-modal";

type SubjectType = {
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  hours: number;
};

const SubjectPage = () => {
  const { id } = useParams(); // Get subject ID from URL
  const router = useRouter();
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchSubject();
    checkUserRole(); // ✅ Fetch user role
  }, [id]);

  // ✅ Fetch user role
  const checkUserRole = async () => {
    const user = await getUser();
    if (user) {
      setUserRole(user.role);
    }
  };

  const fetchSubject = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/v1/subjects/${id}`);
      setSubject(response.data);
    } catch (error) {
      toast.error("Error fetching subject.");
      console.error("Error fetching subject:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async () => {
    try {
      await axiosInstance.delete(`/api/v1/subjects/${id}`);
      toast.success("Subject deleted successfully!");
      setIsDeleteModalOpen(false);
      router.push("/list/subjects");
    } catch (error) {
      toast.error("Failed to delete subject.");
      console.error("Error deleting subject:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl mt-6 text-white">
      {loading ? (
        <p className="text-center text-gray-200">Loading subject...</p>
      ) : subject ? (
        <>
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            {subject.subjectName}
          </h1>
          <p className="text-gray-200 mt-2 text-lg italic">
            {subject.subjectDescription}
          </p>

          <div className="flex items-center gap-3 mt-4 bg-white/20 p-4 rounded-lg shadow-md">
            <ClockIcon className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-semibold text-yellow-300">
              {subject.hours} Hours
            </span>
          </div>

          {userRole == "ADMIN" && (
            <div className="mt-6 flex gap-4">
              <Button
                onPress={() => setIsUpdateModalOpen(true)}
                className="flex items-center gap-2 bg-transparent text-white px-5 py-2 rounded-lg shadow-md hover:scale-100 hover:bg-blue-400 transition-transform"
              >
                <PencilIcon className="w-5 h-5" />
                Edit
              </Button>

              <Button
                onPress={() => setIsDeleteModalOpen(true)}
                className="flex items-center gap-2 bg-transparent text-white px-5 py-2 rounded-lg shadow-md hover:scale-100 hover:bg-red-600 transition-transform"
              >
                <TrashIcon className="w-5 h-5" />
                Delete
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-red-400 text-lg font-semibold">
          ❌ Subject not found.
        </p>
      )}

      <DeleteSubjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirm={handleDeleteSubject}
      />

      {/* ✅ UPDATE SUBJECT MODAL */}
      {subject && (
        <UpdateSubjectModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          subjectId={subject.subjectId}
          onSuccess={fetchSubject}
        />
      )}
    </div>
  );
};

export default SubjectPage;
