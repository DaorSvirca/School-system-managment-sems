"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/store/axiosInstance";
import { getUser } from "@/store/userHelper";
import ClassCard from "../../../../components/class-card";
import AddClassModal from "./_components/add-class-modal";
import { Button } from "@nextui-org/react";

type GroupType = {
  groupId: number;
  groupName: string;
  orientation: string;
};

const ClassListPage = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const user: any = await getUser();
      setRole(user.role);
      const response = await axiosInstance.get("/api/v1/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">All Groups</h1>
        <Button color="primary" onPress={() => setIsAddModalOpen(true)}>
          Add Group
        </Button>
      </div>

      {/* GROUP GRID */}
      <div className="flex flex-wrap gap-6">
        {loading ? (
          <p>Loading groups...</p>
        ) : groups.length > 0 ? (
          groups.map((group) => <ClassCard key={group.groupId} {...group} />)
        ) : (
          <p>No groups found.</p>
        )}
      </div>


      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchGroups} 
      />
    </div>
  );
};

export default ClassListPage;
