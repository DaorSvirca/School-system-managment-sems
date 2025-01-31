"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Button, Spinner, Badge } from "@heroui/react";
import axiosInstance from "@/store/axiosInstance";
import { getUser } from "@/store/userHelper";
import Image from "next/image";
import Link from "next/link";
import AddTeacherModal from "../../admin/_components/add-teacher-modal"; 
import DeleteTeacherModal from "./_components/delete-teacher-moda"; 

type Teacher = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  subjects: { subjectId: number; subjectName: string }[];
  roleId: { roleId: number; roleName: string };
};

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ✅ Function to Fetch Teachers (Refetch After Adding or Deleting)
  const fetchTeachers = async () => {
    try {
      const user = await getUser();
      setRole(user?.role);

      const response = await axiosInstance.get("/api/v1/professors");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1 mx-4">
      {/* ✅ Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">All Teachers</h1>
        {role === "admin" || role === "SUPER_ADMIN" ? (
          <Button color="primary" onPress={() => setIsModalOpen(true)}>
            ➕ Add Teacher
          </Button>
        ) : null}
      </div>

      {/* ✅ Add Teacher Modal (With fetchTeachers) */}
      {role === "admin" || role == "SUPER_ADMIN" ? (
        <AddTeacherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshTeachers={fetchTeachers} // ✅ Pass fetch function
        />
      ) : null}

      {/* ✅ Delete Teacher Modal */}
      <DeleteTeacherModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        teacherId={selectedTeacherId}
        refreshTeachers={fetchTeachers} // ✅ Pass fetch function
      />

      {/* ✅ Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table isStriped className="w-full">
          <TableHeader>
            <TableColumn>Info</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Subjects</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.userId} className="text-sm">
                {/* ✅ Info (Profile Pic + Name) */}
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/avatar.png"
                      alt="Teacher"
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <p className="text-xs text-gray-500">{teacher.gender}</p>
                    </div>
                  </div>
                </TableCell>

                {/* ✅ Email */}
                <TableCell>{teacher.email}</TableCell>

                {/* ✅ Phone */}
                <TableCell>{teacher.phoneNumber || "N/A"}</TableCell>

                {/* ✅ Subjects (Now Displayed as Badges) */}
                <TableCell>
                  {teacher.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((s) => (
                        <Badge key={s.subjectId} color="primary">
                          {s.subjectName.trim()}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">No subjects assigned</span>
                  )}
                </TableCell>

                {/* ✅ Role */}
                <TableCell>{teacher.roleId.roleName}</TableCell>

                {/* ✅ Actions */}
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/list/teachers/${teacher.userId}`}>
                      <Button size="sm" color="primary">
                        View
                      </Button>
                    </Link>
                    {role === "admin" || role === "SUPER_ADMIN" ? (
                      <>
                        <Button size="sm" color="warning">
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onPress={() => {
                            setSelectedTeacherId(teacher.userId);
                            setDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TeacherListPage;
