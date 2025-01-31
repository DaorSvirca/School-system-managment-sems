import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

interface DeleteClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm: () => void;
}

const DeleteSubjectModal: React.FC<DeleteClassModalProps> = ({
  isOpen,
  onClose,
  onDeleteConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="md"
      backdrop="blur"
      placement="center"
    >
      <ModalContent className=" rounded-3xl bg-white ">
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this subject</p>
          <div className="flex justify-end gap-2">
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={onDeleteConfirm}
              className="bg-red-400 rounded-3xl px-6 py-4"
            >
              Delete
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSubjectModal;
