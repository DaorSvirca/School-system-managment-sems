import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;

// "use client"; // ✅ Client component (uses useState, useEffect)

// import { useState, useEffect } from "react";
// import axiosInstance from "@/store/axiosInstance"; // Axios instance
// import Image from "next/image";

// type UserCardProps = {
//   type: string;
// };

// const UserCard = ({ type }: UserCardProps) => {
//   const [count, setCount] = useState<number | null>(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserCount = async () => {
//       try {
//         const response = await axiosInstance.get(`/users/count?role=${type}`); // ✅ Fetch user count by role
//         setCount(response.data.count); // Assuming API returns { count: 1234 }
//       } catch (err) {
//         console.error(`Error fetching ${type} count:`, err);
//         setError("Error loading data");
//       }
//     };

//     fetchUserCount();
//   }, [type]);

//   return (
//     <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
//       <div className="flex justify-between items-center">
//         <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
//           2024/25
//         </span>
//         <Image src="/more.png" alt="" width={20} height={20} />
//       </div>
//       <h1 className="text-2xl font-semibold my-4">
//         {error ? "N/A" : count !== null ? count.toLocaleString() : "Loading..."}
//       </h1>
//       <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
//     </div>
//   );
// };

// export default UserCard;
