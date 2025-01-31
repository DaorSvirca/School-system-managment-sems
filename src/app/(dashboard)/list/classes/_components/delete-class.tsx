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

const DeleteClassModal: React.FC<DeleteClassModalProps> = ({
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
      <ModalContent className=" rounded-3xl">
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this class?</p>
          <div className="flex justify-end gap-2">
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={onDeleteConfirm}>
              Delete
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteClassModal;
