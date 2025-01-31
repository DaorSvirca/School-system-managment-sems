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

interface DeleteTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherId: number | null;
  refreshTeachers: () => void;
}

const DeleteTeacherModal: React.FC<DeleteTeacherModalProps> = ({
  isOpen,
  onClose,
  teacherId,
  refreshTeachers,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!teacherId) return;
    setLoading(true);

    try {
      await axiosInstance.delete(`/api/v1/professors/${teacherId}`);
      toast.success("Teacher deleted successfully!");
      refreshTeachers(); 
      onClose();
    } catch (error) {
      toast.error("Failed to delete teacher.");
      console.error("Error deleting teacher:", error);
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
          <p>Are you sure you want to delete this teacher?</p>
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

export default DeleteTeacherModal;
