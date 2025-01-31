import { useState } from "react";
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

const schema = z.object({
  groupName: z.string().min(1, "Group name is required"),
});

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { groupName: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { groupName: string }) => {
    try {
      setLoading(true);
      await axiosInstance.post("/api/v1/groups", data);
      toast.success("Class added successfully!");
      onClose();
      onSuccess();
    } catch (error: any) {
      if (error.response?.data?.response === "This class already exists") {
        toast.error("This class already exists");
      } else {
        toast.error("Failed to add class");
      }
      console.error("Error adding class:", error);
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
      <ModalContent className="p-4 bg-gray-50 rounded-3xl">
        <ModalHeader className="text-center">Add New Class</ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput name="groupName" label="Class Name" type="text" />

              <div className="flex justify-end gap-2">
                <Button
                  variant="bordered"
                  color="default"
                  onPress={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className=""
                  variant="solid"
                  isLoading={loading}
                >
                  Add Class
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddClassModal;
