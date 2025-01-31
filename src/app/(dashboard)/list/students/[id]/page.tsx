"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ For dynamic route
import Announcements from "@/components/announcements";
import BigCalendar from "@/components/big-calendar";
import Performance from "@/components/performance";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/store/axiosInstance";
import { Spinner } from "@heroui/react";

type GroupType = {
  groupId: number;
  groupName: string;
};

type SemesterType = {
  semesterId: number;
  semesterName: string;
  orientation: string;
};

type AcademicYearType = {
  academicYearId: number;
  academicYear: string;
};

type AddressType = {
  addressId: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

type RoleType = {
  roleId: number;
  roleName: string;
};

type StudentType = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  addressId: AddressType;
  roleId: RoleType;
  groupId?: GroupType;
  semesterId?: SemesterType;
  academicYearId?: AcademicYearType;
  createdAt: string;
  updatedAt: string;
};

const SingleStudentPage = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ studentId from URL
  const [student, setStudent] = useState<StudentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">
          Student not found
        </h1>
      </div>
    );
  }

  // ✅ Destructure student data for clarity
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    birthDate,
    gender,
    addressId,
    groupId,
    semesterId,
    academicYearId,
  } = student;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="/avatar.png"
                alt="Student Avatar"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              {/* Name */}
              <h1 className="text-xl font-semibold">
                {firstName} {lastName}
              </h1>

              {/* Description or Bio */}
              <p className="text-sm text-gray-500">
                A dedicated {gender.toLowerCase()} student.
              </p>

              {/* Quick Info */}
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                {/* Birth Date */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/date.png"
                    alt="Birthdate"
                    width={14}
                    height={14}
                  />
                  <span>{birthDate}</span>
                </div>
                {/* Email */}
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="Email" width={14} height={14} />
                  <span>{email}</span>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="Phone" width={14} height={14} />
                  <span>{phoneNumber || "N/A"}</span>
                </div>
                {/* Address */}
                {addressId && (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/location.png"
                      alt="Address"
                      width={14}
                      height={14}
                    />
                    <span>
                      {addressId.street}, {addressId.city}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD #1: Attendance (dummy) */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt="Attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>

            {/* CARD #2: Grade => Could be from 'groupId' or 'semesterId' */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] ">
              <Link href={`/list/classes/${groupId?.groupId}`}>
                <Image
                  src="/singleBranch.png"
                  alt="Grade"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div>
                  <h1 className="text-xl font-semibold">
                    {groupId?.groupName || "Group ?"}
                  </h1>
                  <span className="text-sm text-gray-400">Group</span>
                </div>
              </Link>
            </div>

            {/* CARD #3: Lessons => We can show # of subjects from the semester */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt="Lessons"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold"></h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>

            {/* CARD #4: Class => Could interpret from Semester or group */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt="Class"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h1 className="text-xl font-semibold">
                  {semesterId?.semesterName || "Semester"}
                </h1>
                <span className="text-sm text-gray-400">
                  {academicYearId?.academicYear || "Year"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="mb-2 font-semibold text-lg">
            Student&apos;s Schedule
          </h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Student&apos;s Teachers
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Assignments
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
