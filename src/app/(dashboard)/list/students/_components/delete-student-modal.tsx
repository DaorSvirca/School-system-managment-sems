"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import axiosInstance from "@/store/axiosInstance";
import { toast } from "react-toastify";

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: number | null;
  refreshStudents: () => void;
}

const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  isOpen,
  onClose,
  studentId,
  refreshStudents,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!studentId) return;
    setLoading(true);

    try {
      await axiosInstance.delete(`/api/v1/students/${studentId}`);
      toast.success("Student deleted successfully!");
      refreshStudents(); 
      onClose();
    } catch (error) {
      toast.error("Failed to delete student.");
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="md"
      backdrop="blur"
    >
      <ModalContent className="rounded-3xl">
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this student?</p>
          <div className="flex justify-end gap-2">
            <Button color="default" onPress={onClose} isDisabled={loading}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete} isDisabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteStudentModal;
