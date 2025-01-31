"use client";

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/store/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/input-field";
import { Button, Select, SelectItem } from "@nextui-org/react";


const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zipCode: z.string().min(4, "Zip Code must be at least 4 digits"),
});


const studentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z.string().nonempty("Birthdate is required"),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
});

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshStudents: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  refreshStudents,
}) => {

  const methods = useForm({
    resolver: zodResolver(studentSchema),
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


  const [groups, setGroups] = useState<{ groupId: number; groupName: string }[]>(
    []
  );
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);


  const [semesters, setSemesters] = useState<
    { semesterId: number; semesterName: string }[]
  >([]);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);


  const [academicYears, setAcademicYears] = useState<
    { academicYearId: number; academicYear: string }[]
  >([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<
    number | null
  >(null);

 
  const [subjects, setSubjects] = useState<
    { subjectId: number; subjectName: string }[]
  >([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupRes = await axiosInstance.get("/api/v1/groups");
        setGroups(groupRes.data);

        const semesterRes = await axiosInstance.get("/api/v1/semesters");
        setSemesters(semesterRes.data);

        const academicYearRes = await axiosInstance.get("/api/v1/academic-years");
        setAcademicYears(academicYearRes.data);

        const subjectRes = await axiosInstance.get("/api/v1/subjects");
        setSubjects(subjectRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleSubjectChange = (subjectId: number) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };


  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
   
      const studentData = methods.getValues();
      const addressData = addressMethods.getValues();


      if (!selectedGroup || !selectedSemester || !selectedAcademicYear) {
        toast.error("Please select Group, Semester, and Academic Year.");
        setLoading(false);
        return;
      }


      const addressResponse = await axiosInstance.post(
        "/api/v1/addresses",
        addressData
      );
      const addressId = addressResponse.data.addressId;

     
      const subjectObjects = selectedSubjects.map((id) => ({ subjectId: id }));

      const finalStudentData = {
        ...studentData,
        addressId: { addressId },
        roleId: { roleId: 2, roleName: "STUDENT" },
        groupId: { groupId: selectedGroup },
        semesterId: { semesterId: selectedSemester },
        academicYearId: { academicYearId: selectedAcademicYear },
        subjects: subjectObjects,
      };

      console.log("Final Student Data:", JSON.stringify(finalStudentData, null, 2));

      
      await axiosInstance.post("/api/v1/students", finalStudentData);

      toast.success("Student added successfully!");
      refreshStudents();  
      onClose();          
    } catch (error) {
      toast.error("Failed to add student.");
      console.error("Error adding student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
   
      <ModalContent className="p-6 bg-white rounded-xl shadow-lg max-w-5xl">
        <ModalHeader className="text-center text-xl font-bold text-gray-900">
          ➕ Add Student
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleFinalSubmit} className="space-y-8">

            <FormProvider {...addressMethods}>
              <h3 className="text-lg font-semibold text-gray-800">🗺️ Address Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput name="street" label="Street" type="text" />
                <FormInput name="city" label="City" type="text" />
                <FormInput name="state" label="State" type="text" />
                <FormInput name="country" label="Country" type="text" />
                <FormInput name="zipCode" label="Zip Code" type="text" />
              </div>
            </FormProvider>


            <FormProvider {...methods}>
              <h3 className="text-lg font-semibold text-gray-800">👤 Student Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormInput name="firstName" label="First Name" type="text" />
                <FormInput name="lastName" label="Last Name" type="text" />
                <FormInput name="email" label="Email" type="text" />
                <FormInput name="password" label="Password" type="password" />
                <FormInput name="phoneNumber" label="Phone Number" type="text" />
                <FormInput name="birthDate" label="Birth Date" type="date" />
              </div>

    
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Gender</h4>
                <Select
                  selectedKeys={new Set([methods.getValues("gender")])}
                  onSelectionChange={(keys) => {
                    const gender = Array.from(keys)[0] as "MALE" | "FEMALE";
                    methods.setValue("gender", gender);
                  }}
                >
                  <SelectItem key="MALE">Male</SelectItem>
                  <SelectItem key="FEMALE">Female</SelectItem>
                </Select>
              </div>
            </FormProvider>


            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Group</h4>
                <Select
                  placeholder="Select Group"
                  selectedKeys={selectedGroup ? new Set([String(selectedGroup)]) : new Set()}
                  onSelectionChange={(keys) => {
                    const val = Number(Array.from(keys)[0]);
                    setSelectedGroup(val);
                  }}
                >
                  {groups.map((g) => (
                    <SelectItem key={g.groupId} value={String(g.groupId)}>
                      {g.groupName}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700">Semester</h4>
                <Select
                  placeholder="Select Semester"
                  selectedKeys={
                    selectedSemester ? new Set([String(selectedSemester)]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const val = Number(Array.from(keys)[0]);
                    setSelectedSemester(val);
                  }}
                >
                  {semesters.map((s) => (
                    <SelectItem key={s.semesterId} value={String(s.semesterId)}>
                      {s.semesterName}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700">Academic Year</h4>
                <Select
                  placeholder="Select Year"
                  selectedKeys={
                    selectedAcademicYear ? new Set([String(selectedAcademicYear)]) : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const val = Number(Array.from(keys)[0]);
                    setSelectedAcademicYear(val);
                  }}
                >
                  {academicYears.map((ay) => (
                    <SelectItem key={ay.academicYearId} value={String(ay.academicYearId)}>
                      {ay.academicYear}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

 
            <div>
              <h3 className="text-lg font-semibold text-gray-800">📚 Assign Subjects</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {subjects.map((subject) => (
                  <label key={subject.subjectId} className="flex items-center gap-2">
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
            </div>


            <div className="flex justify-end gap-3 mt-6">
              <Button color="danger" variant="flat" onPress={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button type="submit" color="primary" isDisabled={loading} onPress={() => {}}>
                {loading ? "Adding..." : "Add Student"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddStudentModal;
