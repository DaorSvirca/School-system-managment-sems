// "use client";

// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// // ✅ Import styles for toast notifications
// import "react-toastify/dist/ReactToastify.css";

// const TeacherForm = dynamic(() => import("./form/teacher-form"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const StudentForm = dynamic(() => import("./form/student-form"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const SubjectForm = dynamic(() => import("./form/subject-form"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const ClassForm = dynamic(() => import("./form/class-fom"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const forms: {
//   [key: string]: (
//     type: "create" | "update",
//     data?: any,
//     setOpen?: (open: boolean) => void
//   ) => JSX.Element;
// } = {
//   teacher: (type, data, setOpen) => (
//     <TeacherForm type={type} data={data} setOpen={setOpen} />
//   ),
//   student: (type, data, setOpen) => (
//     <StudentForm type={type} data={data} setOpen={setOpen} />
//   ),
//   subject: (type, data, setOpen) => (
//     <SubjectForm type={type} data={data} setOpen={setOpen} />
//   ),
//   class: (type, data, setOpen) => (
//     <ClassForm type={type} data={data} setOpen={setOpen} />
//   ),
// };

// const FormModal = ({
//   table,
//   type,
//   data,
//   id,
// }: {
//   table:
//     | "teacher"
//     | "student"
//     | "subject"
//     | "class"
//     | "lesson"
//     | "exam"
//     | "assignment"
//     | "result"
//     | "attendance"
//     | "event"
//     | "announcement";
//   type: "create" | "update" | "delete";
//   data?: any;
//   id?: number;
// }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <ToastContainer /> {/* ✅ Add Toast Notifications Container */}
//       <button
//         className={`w-7 h-7 flex items-center justify-center rounded-full ${
//           type === "create"
//             ? "bg-lamaYellow"
//             : type === "update"
//             ? "bg-lamaSky"
//             : "bg-lamaPurple"
//         }`}
//         onClick={() => setOpen(true)}
//       >
//         <Image src={`/${type}.png`} alt="" width={16} height={16} />
//       </button>
//       {open && (
//         <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
//             {type === "delete" && id ? (
//               <form className="p-4 flex flex-col gap-4">
//                 <span className="text-center font-medium">
//                   All data will be lost. Are you sure you want to delete this{" "}
//                   {table}?
//                 </span>
//                 <button
//                   className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
//                   onClick={() => setOpen(false)}
//                 >
//                   Delete
//                 </button>
//               </form>
//             ) : (
//               forms[table](type, data, setOpen) // ✅ Pass setOpen to the form
//             )}

//             <div
//               className="absolute top-4 right-4 cursor-pointer"
//               onClick={() => setOpen(false)}
//             >
//               <Image src="/close.png" alt="" width={14} height={14} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;
