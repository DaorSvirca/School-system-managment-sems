import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "@/store/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/input-field";
import { Button } from "@heroui/react";

// ✅ Form validation schema using Zod
const schema = z.object({
  subjectName: z.string().min(3, "Subject name must be at least 3 characters"),
  subjectDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  hours: z
    .number()
    .positive("Hours must be a positive number")
    .min(1, "Hours must be at least 1"),
});

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subjectName: "",
      subjectDescription: "",
      hours: 1,
    },
  });

  const [loading, setLoading] = useState(false);

  // ✅ Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      methods.reset({
        subjectName: "",
        subjectDescription: "",
        hours: 1,
      });
    }
  }, [isOpen, methods]);

  const onSubmit = async (data: {
    subjectName: string;
    subjectDescription: string;
    hours: number;
  }) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/v1/subjects", data);
      toast.success("Subject added successfully! 🎉");

      // ✅ Reset form after successful submission
      methods.reset({
        subjectName: "",
        subjectDescription: "",
        hours: 1,
      });

      onClose();
      onSuccess();
    } catch (error: any) {
      if (error.response?.data?.message === "This subject already exists") {
        toast.error("This subject already exists ❌");
      } else {
        toast.error("Failed to add subject 😞");
      }
      console.error("Error adding subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      backdrop="blur"
      placement="center"
    >
      <ModalContent className="border-gray-700 p-4 bg-gray-50 rounded-3xl shadow-lg ">
        <ModalHeader className="text-center text-lg font-semibold text-gray-900">
          ➕ Add New Subject
        </ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* SUBJECT NAME */}
              <FormInput name="subjectName" label="Subject Name" type="text" />

              {/* SUBJECT DESCRIPTION */}
              <FormInput
                name="subjectDescription"
                label="Subject Description"
                type="textarea"
              />

              {/* HOURS */}
              <div>
                <label className="block text-gray-700 font-medium">Hours</label>
                <input
                  type="number"
                  {...methods.register("hours", { valueAsNumber: true })} // 🔥 Ensures it's treated as a number
                  className="w-full px-3 py-2 border-b rounded-md focus:outline-none "
                />
                {methods.formState.errors.hours && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.hours.message}
                  </p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-5 py-3 text-gray-700 bg-gray-200 rounded-3xl shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white bg-blue-400 rounded-3xl shadow-md hover:bg-blue-200 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Adding..." : "Add Subject"}
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSubjectModal;
