import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosInstance from "@/store/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/input-field";
import { Button } from "@nextui-org/react";

const schema = z.object({
  subjectName: z.string().min(3, "Subject name must be at least 3 characters"),
  subjectDescription: z
    .string()
    .min(1, "Description must be at least 10 characters"),
  hours: z
    .number()
    .positive("Hours must be a positive number")
    .min(1, "Hours must be at least 1"),
});

interface UpdateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: number;
  onSuccess: () => void;
}

const UpdateSubjectModal: React.FC<UpdateSubjectModalProps> = ({
  isOpen,
  onClose,
  subjectId,
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

  // Fetch subject details when modal opens
  useEffect(() => {
    const fetchSubjectDetails = async () => {
      if (!subjectId) return;
      try {
        const response = await axiosInstance.get(
          `/api/v1/subjects/${subjectId}`
        );
        methods.reset(response.data); // Set form values
      } catch (error) {
        toast.error("Failed to fetch subject details");
        console.error("Error fetching subject:", error);
      }
    };

    if (isOpen) fetchSubjectDetails();
  }, [isOpen, subjectId, methods]);

  const onSubmit = async (data: {
    subjectName: string;
    subjectDescription: string;
    hours: number;
  }) => {
    try {
      setLoading(true);

      // ✅ Ensure the request body contains the correct `subjectId`
      const requestData = { ...data, subjectId };

      await axiosInstance.put(`/api/v1/subjects/${subjectId}`, requestData);

      toast.success("Subject updated successfully! 🎉");
      onClose();
      onSuccess(); // Refresh the subject details after updating
    } catch (error: any) {
      toast.error("Failed to update subject ❌");
      console.error("Error updating subject:", error);
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
      <ModalContent className="border-gray-700 p-4 bg-white rounded-3xl shadow-lg">
        <ModalHeader className="text-center text-lg font-semibold text-gray-900">
          ✏️ Update Subject
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
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Updating..." : "Update Subject"}
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSubjectModal;
