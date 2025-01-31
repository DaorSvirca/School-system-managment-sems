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

// 1) Address Schema
const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zipCode: z.string().min(4, "Zip Code must be at least 4 digits"),
});

// 2) Teacher Schema
const teacherSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z.string().nonempty("Birthdate is required"),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  // We'll store the checkboxes' result in an array. We'll convert them to { subjectId } objects later.
  subjects: z.array(z.any()).nonempty("At least one subject must be selected"),
});

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Teacher form
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
      subjects: [] as Array<string | number>,
    },
  });

  // Address form
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

  // Optional: If you want to fetch role object from /api/v1/roles/3, you can do it here.
  // For now, we assume we know roleId = 3 is "Professor".
  const [role, setRole] = useState<number>(3);

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

    /*
    // If you do want to fetch the role object from the backend:
    // e.g. /api/v1/roles/3 -> { "roleId": 3, "roleName": "PROFESSOR" }
    // you can do something like:

    const fetchRole = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/roles/3");
        // if you need the entire object, store it:
        // e.g. setRoleObj(res.data);
        // if you just need roleId number, set it from res.data.roleId
        setRole(res.data.roleId);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
    */
  }, []);

  // Handle form submit
  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // 1) Get data from both forms
      const teacherData = methods.getValues();
      const addressData = addressMethods.getValues();

      // 2) Create address first
      const addressResponse = await axiosInstance.post(
        "/api/v1/addresses",
        addressData
      );
      const addressId = addressResponse.data.addressId;

      // 3) Convert "subjects" from strings to numbers (if needed).
      const subjectIds = teacherData.subjects.map(
        (idOrString: string | number) =>
          typeof idOrString === "string" ? parseInt(idOrString, 10) : idOrString
      );

      // 4) Convert numeric IDs into objects: [{ subjectId: 1 }, { subjectId: 3 }]
      const subjectObjects = subjectIds.map((id: number) => ({
        subjectId: id,
      }));

      // 5) Build final teacher data
      // Instead of "roleId: 3", we do "roleId: { roleId: 3 }" like address
      const finalTeacherData = {
        ...teacherData,
        addressId: { addressId },
        roleId: { roleId: role }, // role is 3 by default, or fetched from endpoint
        subjects: subjectObjects,
      };

      // 6) Create teacher (professor)
      await axiosInstance.post("/api/v1/professors", finalTeacherData);

      toast.success("Teacher (Professor) added successfully!");
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
      <ModalContent className="p-6 bg-white rounded-3xl shadow-lg">
        <ModalHeader className="text-center text-lg font-semibold text-gray-900">
          ➕ Add Teacher
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleFinalSubmit}>
            {/* Address Form Fields */}
            <FormProvider {...addressMethods}>
              <h3 className="text-lg font-semibold text-gray-800">
                🗺️ Address Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <FormInput name="street" label="Street" type="text" />
                <FormInput name="city" label="City" type="text" />
                <FormInput name="state" label="State" type="text" />
                <FormInput name="country" label="Country" type="text" />
                <FormInput name="zipCode" label="Zip Code" type="text" />
              </div>
            </FormProvider>

            {/* Teacher Form Fields */}
            <FormProvider {...methods}>
              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                👤 Teacher Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
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

              {/* Subject Checkboxes */}
              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                📚 Assign Subjects
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <label
                    key={subject.subjectId}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={subject.subjectId} // will come in as string
                      {...methods.register("subjects")}
                    />
                    {subject.subjectName}
                  </label>
                ))}
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-2 mt-6">
                <Button onPress={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white"
                  isDisabled={loading}
                >
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
