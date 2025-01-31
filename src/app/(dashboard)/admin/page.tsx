"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Announcements from "@/components/announcements";
import AttendanceChart from "@/components/atendance-chart";
import CountChart from "@/components/count-chart";
import EventCalendar from "@/components/event-calendar";
import FinanceChart from "@/components/finance-chart";
import UserCard from "@/components/user-card";
import AddTeacherModal from "./_components/add-teacher-modal"; // ✅ Import modal
import { getUser } from "@/store/userHelper"; // ✅ Fetch User Role

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) setUserRole(user.role);
    };

    fetchUser();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />

        {/* ✅ ADD TEACHER BUTTON (Only for Admins) */}

        <Button
          className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-all"
          onPress={() => setIsModalOpen(true)}
        >
          ➕ Add Teacher
        </Button>
      </div>

      {/* ✅ ADD TEACHER MODAL */}
      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
