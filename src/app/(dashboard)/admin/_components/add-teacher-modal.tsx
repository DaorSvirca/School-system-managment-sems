"use client";

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/store/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/input-field";
import { Button } from "@nextui-org/react";

// ✅ Address Schema
const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zipCode: z.string().min(4, "Zip Code must be at least 4 digits"),
});

// ✅ Teacher Schema
const teacherSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z.string().nonempty("Birthdate is required"),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
});

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTeachers: () => void; 
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
  refreshTeachers, 
}) => {
  const methods = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      birthDate: new Date().toISOString().slice(0, 10),
      gender: "MALE",
    },
  });

  const addressMethods = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<
    { subjectId: number; subjectName: string }[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [role] = useState<number>(3);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  // ✅ Handle Checkbox Click
  const handleSubjectChange = (subjectId: number) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subjectId)
        ? prevSubjects.filter((id) => id !== subjectId)
        : [...prevSubjects, subjectId]
    );
  };

  // ✅ Handle form submit
  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {

      const teacherData = methods.getValues();
      const addressData = addressMethods.getValues();

      if (selectedSubjects.length === 0) {
        toast.error("Please select at least one subject.");
        setLoading(false);
        return;
      }

      const addressResponse = await axiosInstance.post(
        "/api/v1/addresses",
        addressData
      );
      const addressId = addressResponse.data.addressId;


      const subjectObjects = selectedSubjects.map((id) => ({ subjectId: id }));


      const finalTeacherData = {
        ...teacherData,
        addressId: { addressId },
        roleId: { roleId: role, roleName: "PROFESSOR" },
        subjects: subjectObjects,
      };


      console.log(
        "Final Teacher Data:",
        JSON.stringify(finalTeacherData, null, 2)
      );

      // 5) Create teacher (professor)
      await axiosInstance.post("/api/v1/professors", finalTeacherData);

      toast.success("Teacher (Professor) added successfully!");
      refreshTeachers(); 
      onClose(); 
    } catch (error) {
      toast.error("Failed to add teacher.");
      console.error("Error adding teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
      <ModalContent className="p-6 bg-white rounded-xl shadow-lg max-w-4xl">
        <ModalHeader className="text-center text-xl font-bold text-gray-900">
          ➕ Add Teacher
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            {/* ✅ Address Form */}
            <FormProvider {...addressMethods}>
              <h3 className="text-lg font-semibold text-gray-800">
                🗺️ Address Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput name="street" label="Street" type="text" />
                <FormInput name="city" label="City" type="text" />
                <FormInput name="state" label="State" type="text" />
                <FormInput name="country" label="Country" type="text" />
                <FormInput name="zipCode" label="Zip Code" type="text" />
              </div>
            </FormProvider>

            {/* ✅ Teacher Form */}
            <FormProvider {...methods}>
              <h3 className="text-lg font-semibold text-gray-800">
                👤 Teacher Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput name="firstName" label="First Name" type="text" />
                <FormInput name="lastName" label="Last Name" type="text" />
                <FormInput name="email" label="Email" type="text" />
                <FormInput name="password" label="Password" type="password" />
                <FormInput
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                />
                <FormInput name="birthDate" label="Birth Date" type="date" />
              </div>

              {/* ✅ Subject Checkboxes */}
              <h3 className="text-lg font-semibold text-gray-800">
                📚 Assign Subjects
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <label
                    key={subject.subjectId}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={subject.subjectId}
                      checked={selectedSubjects.includes(subject.subjectId)}
                      onChange={() => handleSubjectChange(subject.subjectId)}
                    />
                    {subject.subjectName}
                  </label>
                ))}
              </div>


              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onPress={onClose}
                  color="danger"
                  variant="flat"
                  isDisabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" isDisabled={loading}>
                  {loading ? "Adding..." : "Add Teacher"}
                </Button>
              </div>
            </FormProvider>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTeacherModal;
