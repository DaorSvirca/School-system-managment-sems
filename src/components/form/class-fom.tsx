// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axiosInstance from "@/store/axiosInstance";
// import { useRouter } from "next/navigation";
// import InputField from "../input-field";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // ✅ Define the schema correctly
// const schema = z.object({
//   groupName: z.string().min(1, { message: "Group name is required!" }),
//   orientation: z.enum(["Programming", "It"], {
//     message: "Orientation is required!",
//   }),
// });

// // ✅ Define the type for form data based on schema
// type Inputs = z.infer<typeof schema>;

// const ClassForm = ({
//   type,
//   data,
//   setOpen,
// }: {
//   type: "create" | "update" | "delete";
//   data?: any;
//   setOpen?: (open: boolean) => void;
// }) => {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       groupName: data?.groupName || "",
//       orientation: data?.orientation,
//     },
//   });

//   // ✅ Handle Delete Function
//   const handleDelete = async () => {
//     try {
//       if (data?.groupId) {
//         await axiosInstance.delete(`/api/v1/groups/${data.groupId}`);
//         toast.success("Group deleted successfully!");
//         setOpen?.(false); // Close modal
//         router.push("/list/classes");
//       }
//     } catch (error) {
//       console.error("Error deleting group:", error);
//       toast.error("An error occurred while deleting the group.");
//     }
//   };

//   // ✅ Handle Create/Update
//   const onSubmit = handleSubmit(async (formData) => {
//     try {
//       if (type === "update" && data?.groupId) {
//         await axiosInstance.put(`/api/v1/groups/${data.groupId}`, {
//           groupId: data.groupId,
//           groupName: formData.groupName,
//           orientation: formData.orientation,
//         });
//         toast.success("Group updated successfully!");
//       } else if (type === "create") {
//         await axiosInstance.post(`/api/v1/groups`, formData);
//         toast.success("Group created successfully!");
//       }

//       setOpen?.(false);
//       router.refresh();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("An error occurred while submitting the form.");
//     }
//   });

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create"
//           ? "Create New Group"
//           : type === "update"
//           ? "Update Group"
//           : "Delete Group"}
//       </h1>

//       {/* ✅ Show input fields only for Create and Update */}
//       {type !== "delete" && (
//         <>
//           <InputField
//             label="Group Name"
//             name="groupName"
//             register={register}
//             error={errors?.groupName}
//           />

//           <div className="flex flex-col gap-2 w-full md:w-1/4">
//             <label className="text-xs text-gray-500">Orientation</label>
//             <select
//               className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//               {...register("orientation")}
//             >
//               <option value="Programming">Programming</option>
//               <option value="It">IT</option>
//             </select>
//             {errors.orientation?.message && (
//               <p className="text-xs text-red-400">
//                 {errors.orientation.message.toString()}
//               </p>
//             )}
//           </div>
//         </>
//       )}

//       {/* ✅ Show Delete Confirmation Button if Type is Delete */}
//       {type === "delete" ? (
//         <button
//           type="button"
//           onClick={handleDelete}
//           className="bg-red-600 text-white p-2 rounded-md"
//         >
//           Delete Group
//         </button>
//       ) : (
//         <button className="bg-blue-400 text-white p-2 rounded-md">
//           {type === "create" ? "Create" : "Update"}
//         </button>
//       )}
//     </form>
//   );
// };

// export default ClassForm;
