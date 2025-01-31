"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/store/axiosInstance";
import { Button, Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import EditClassModal from "../_components/update-class-modal";
import DeleteClassModal from "../_components/delete-class";

type UserType = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
};

type ClassDataType = {
  groupId: number;
  groupName: string;
  users?: UserType[]; 
};

const ClassDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; 
  const [classData, setClassData] = useState<ClassDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchClassDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/groups/${id}`);
        setClassData(response.data);
      } catch (error) {
        console.error("Error fetching class:", error);
        setError("Failed to fetch class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleUpdate = async (updatedData: { groupName: string }) => {
    try {
      await axiosInstance.put(`/api/v1/groups/${id}`, {
        groupId: Number(id),
        groupName: updatedData.groupName,
      });

      setClassData((prev) =>
        prev ? { ...prev, groupName: updatedData.groupName } : null
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/v1/groups/${id}`);
      router.push("/list/classes");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-4">
      <Card className=" bg-gradient-to-br from-blue-500 to-purple-600 w-full max-w-lg shadow-lg rounded-lg p-6 bg-white">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-gray-50">
            {classData?.groupName || "No class found"}
          </h1>
        </CardHeader>
        <CardBody>
          <p className="text-gray-50 mb-2">Class ID: {classData?.groupId}</p>


          <div className="mt-4">
            <h2 className="font-semibold mb-2 text-gray-50">
              Students in this Group
            </h2>
            {classData?.users && classData.users.length > 0 ? (
              <ul className="space-y-2">
                {classData.users.map((student) => (
                  <li
                    key={student.userId}
                    className="flex items-center gap-2 text-gray-50"
                  >

                    <span className="font-medium text-gray-50">
                      {student.firstName} {student.lastName}
                    </span>
           
                    <span className="text-gray-50 text-sm">
                      ({student.email})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No students found in this group.
              </p>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex gap-4 mt-4">
          <Button
            color="primary"
            className="bg-blue-50  hover:bg-blue-200 rounded-lg"
            onPress={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            color="danger"
            className="bg-red-500 rounded-lg"
            onPress={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>


      <EditClassModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        classData={classData}
        onSubmit={handleUpdate}
      />
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteConfirm={handleDelete}
      />
    </div>
  );
};

export default ClassDetailsPage;
