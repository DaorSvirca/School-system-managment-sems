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
import AddStudentModal from "./_components/add-student-modal";
import DeleteStudentModal from "./_components/delete-student-modal"; // ✅ Import Delete Modal

type Student = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  groupId: { groupId: number; groupName: string };
  semesterId: { semesterId: number; semesterName: string };
  academicYearId: { academicYearId: number; academicYear: string };
};

const StudentListPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const user = await getUser();
      setRole(user?.role);

      const response = await axiosInstance.get("/api/v1/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1 mx-4">
   
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">All Students</h1>
        {role === "admin" || role === "SUPER_ADMIN" ? (
          <Button color="primary" onPress={() => setIsModalOpen(true)}>
            ➕ Add Student
          </Button>
        ) : null}
      </div>

    
      {role === "admin" || role === "SUPER_ADMIN" ? (
        <AddStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshStudents={fetchStudents} 
        />
      ) : null}

      {/* ✅ Delete Student Modal */}
      <DeleteStudentModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        studentId={selectedStudentId}
        refreshStudents={fetchStudents} 
      />

      {/* ✅ Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <Table isStriped className="w-full">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Group</TableColumn>
            <TableColumn>Semester</TableColumn>
            <TableColumn>Academic Year</TableColumn>
            <TableColumn>Gender</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.userId} className="text-sm">
              
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>

            
                <TableCell>{student.email}</TableCell>

            
                <TableCell>
                  <Badge color="primary">
                    {student.groupId?.groupName || "N/A"}
                  </Badge>
                </TableCell>

            
                <TableCell>
                  <Badge color="success">
                    {student.semesterId?.semesterName || "N/A"}
                  </Badge>
                </TableCell>

        
                <TableCell>
                  <Badge color="warning">
                    {student.academicYearId?.academicYear || "N/A"}
                  </Badge>
                </TableCell>

       
                <TableCell>{student.gender}</TableCell>

         
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/list/students/${student.userId}`}>
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
                            setSelectedStudentId(student.userId);
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

export default StudentListPage;
