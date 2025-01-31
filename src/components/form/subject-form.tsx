// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import InputField from "../input-field";
// import Image from "next/image";

// const schema = z.object({
//   name: z
//     .string()
//     .min(3, { message: "Subject name must be at least 3 characters long!" }),
//   code: z
//     .string()
//     .min(2, { message: "Subject code must be at least 2 characters long!" }),
//   description: z
//     .string()
//     .min(5, { message: "Description must be at least 5 characters long!" }),
//   credits: z
//     .number()
//     .min(1, { message: "Credits must be at least 1!" })
//     .max(10, { message: "Credits cannot exceed 10!" }),
//   teacher: z.string().min(1, { message: "Teacher is required!" }),
//   img: z.instanceof(File, { message: "Image is required" }).optional(),
// });

// type Inputs = z.infer<typeof schema>;

// const SubjectForm = ({
//   type,
//   data,
//   setOpen, // ✅ Add setOpen here
// }: {
//   type: "create" | "update";
//   data?: any;
//   setOpen?: (open: boolean) => void;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(schema),
//     defaultValues: data || {}, // Populate form with existing data for update
//   });

//   const onSubmit = handleSubmit((formData) => {
//     console.log(formData);
//   });

//   return (
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Create a new subject" : "Update subject"}
//       </h1>

//       <div className="flex flex-wrap gap-4">
//         <InputField
//           label="Subject Name"
//           name="name"
//           register={register}
//           error={errors.name}
//         />
//         <InputField
//           label="Subject Code"
//           name="code"
//           register={register}
//           error={errors.code}
//         />
//       </div>

//       <InputField
//         label="Description"
//         name="description"
//         register={register}
//         error={errors.description}
//         type="textarea"
//       />

//       <div className="flex flex-wrap gap-4">
//         <InputField
//           label="Credits"
//           name="credits"
//           register={register}
//           error={errors.credits}
//           type="number"
//         />
//         <InputField
//           label="Assigned Teacher"
//           name="teacher"
//           register={register}
//           error={errors.teacher}
//         />
//       </div>

//       <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
//         <label
//           className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
//           htmlFor="img"
//         >
//           <Image src="/upload.png" alt="" width={28} height={28} />
//           <span>Upload a subject image</span>
//         </label>
//         <input type="file" id="img" {...register("img")} className="hidden" />
//         {errors.img?.message && (
//           <p className="text-xs text-red-400">
//             {errors.img.message.toString()}
//           </p>
//         )}
//       </div>

//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "create" ? "Create" : "Update"}
//       </button>
//     </form>
//   );
// };

// export default SubjectForm;
