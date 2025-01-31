import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/input-field";

const schema = z.object({
  groupName: z.string().min(1, "Group name is required"),
});

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: { groupName: string } | null;
  onSubmit: (updatedData: { groupName: string }) => void;
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  isOpen,
  onClose,
  classData,
  onSubmit,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      groupName: classData?.groupName || "",
    },
  });

  useEffect(() => {
    if (classData) {
      methods.setValue("groupName", classData.groupName);
    }
  }, [classData, methods]);

  const handleSubmit = (data: { groupName: string }) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="xl"
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Edit Class</ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInput name="groupName" type="text" label="Class Name" />

              <div className="flex justify-end gap-2">
                <Button
                  color="default"
                  className="bg-gray-400 rounded-3xl"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="bg-blue-300 hover:bg-blue-500 rounded-3xl transition-all ease-in duration-300"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditClassModal;
