"use client";

import { useRouter } from "next/navigation";

type ClassCardProps = {
  groupId: number;
  groupName: string;
  orientation: string;
};

const ClassCard = ({ groupId, groupName, orientation }: ClassCardProps) => {
  const router = useRouter();

  return (
    <div
      className="bg-white p-4 shadow-md rounded-lg flex flex-col gap-2 w-full md:w-[30%] lg:w-[22%] cursor-pointer transition-all hover:shadow-xl"
      onClick={() => router.push(`classes/${groupId}`)}
    >
      <h2 className="text-lg font-semibold text-lamaPurple">{groupName}</h2>
      <p className="text-gray-600">
        Orientation: <span className="font-medium">{orientation}</span>
      </p>
    </div>
  );
};

export default ClassCard;
