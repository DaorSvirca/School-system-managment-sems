"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/store/axiosInstance";
import { Button, Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import EditClassModal from "../_components/update-class-modal";
import DeleteClassModal from "../_components/delete-class";

type ClassDataType = {
  groupId: number;
  groupName: string;
};

const ClassDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // Ensure it's a string

  const [classData, setClassData] = useState<ClassDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return; // Avoid making the request if id is undefined

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
        groupId: Number(id), // Ensure correct data type
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
      router.push("/list/classes"); // Redirect after delete
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-6 bg-white">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-lamaPurple">
            {classData?.groupName || "No class found"}
          </h1>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600">Class ID: {classData?.groupId}</p>
        </CardBody>
        <CardFooter className="flex gap-4 mt-4">
          <Button
            color="primary"
            className="bg-gray-400 hover:bg-blue-200 rounded-lg"
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
