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

// ✅ Address Schema (if you want to create a new address)
const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zipCode: z.string().min(4, "Zip Code must be at least 4 digits"),
});

// ✅ Admin Schema
const adminSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(6, "Phone number must be at least 6 digits"),
  birthDate: z.string().nonempty("Birthdate is required"),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
});

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshAdmins?: () => void; 
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  refreshAdmins,
}) => {

  const methods = useForm({
    resolver: zodResolver(adminSchema),
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


  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {

      const adminData = methods.getValues();
      const addressData = addressMethods.getValues();


      const addressResponse = await axiosInstance.post(
        "/api/v1/addresses",
        addressData
      );
      const addressId = addressResponse.data.addressId; 

      const finalAdminData = {
        ...adminData,
        address: { addressId },
        role: {
          roleId: 1,
          roleName: "ADMIN",
        },
      };

      console.log("Final Admin Data:", JSON.stringify(finalAdminData, null, 2));


      await axiosInstance.post("/api/v1/users", finalAdminData);

      toast.success("Admin added successfully!");
      refreshAdmins?.(); 
      onClose(); 
    } catch (error) {
      toast.error("Failed to add admin.");
      console.error("Error adding admin:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
      <ModalContent className="p-6 bg-white rounded-xl shadow-lg max-w-4xl">
        <ModalHeader className="text-center text-xl font-bold text-gray-900">
          ➕ Add Admin
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleFinalSubmit} className="space-y-6">

            <FormProvider {...addressMethods}>
              <h3 className="text-lg font-semibold text-gray-800">
                🗺️ Address Info
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput name="street" label="Street" type="text" />
                <FormInput name="city" label="City" type="text" />
                <FormInput name="state" label="State" type="text" />
                <FormInput name="country" label="Country" type="text" />
                <FormInput name="zipCode" label="Zip Code" type="text" />
              </div>
            </FormProvider>


            <FormProvider {...methods}>
              <h3 className="text-lg font-semibold text-gray-800">
                👤 Admin Info
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
            </FormProvider>


            <div className="flex justify-end gap-3 mt-6">
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                isDisabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" isDisabled={loading}>
                {loading ? "Adding..." : "Add Admin"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddAdminModal;
