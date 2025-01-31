import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

export type Options = {
  id: string;
  name: string;
};

interface FormInputProps {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "number" | "password" | "textarea";
  disabled?: boolean;
  isRequired?: boolean;
  defaultValue?: string | string[];
  autoComplete?: string;
  showPassword?: boolean;
  size?: string;
  isEditable?: boolean;
  options?: Options[];
  classNames?: {
    input: string;
    label: string;
    errorMessage: string;
  };
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type,
  isRequired = false,
  defaultValue = "",
  autoComplete,
  disabled = false,
  showPassword = false,
  isEditable = false,
  options = [],
  classNames = {
    input: "text-lg",
    label: "text-lg text-neutral/700 mb-12 text-gray-700",
    errorMessage: "text-sm",
  },
}) => {
  const { control } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);
  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const renderInput = (field: any, fieldState: any) => {
    switch (type) {
      case "text":
        return (
          <Input
            {...field}
            label={label}
            variant="underlined"
            color={"primary"}
            classNames={classNames}
            size={"lg"}
            autoComplete={autoComplete}
            disabled={disabled}
            isInvalid={fieldState?.invalid}
            errorMessage={fieldState?.error?.message}
            endContent={
              isEditable ? (
                <Image src="/edit.png" alt="" width={14} height={14} />
              ) : (
                <></>
              )
            }
          />
        );
      case "password":
        return (
          <Input
            {...field}
            label={label}
            type={isPasswordVisible ? "text" : "password"}
            variant="underlined"
            color={"primary"}
            classNames={classNames}
            fullWidth
            size={"lg"}
            autoComplete={autoComplete}
            isInvalid={fieldState?.invalid}
            errorMessage={fieldState?.error?.message}
            endContent={
              isEditable ? (
                <Image src="/edit.png" alt="" width={14} height={14} />
              ) : (
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                ></button>
              )
            }
          />
        );
      case "number":
        return (
          <Input
            {...field}
            type="number"
            label={label}
            variant="underlined"
            color={"primary"}
            classNames={classNames}
            size={"lg"}
            autoComplete={autoComplete}
            disabled={disabled}
            isInvalid={fieldState?.invalid}
            errorMessage={fieldState?.error?.message}
            endContent={
              isEditable ? (
                <Image src="/edit.png" alt="" width={14} height={14} />
              ) : (
                <></>
              )
            }
          />
        );

      case "select":
        return (
          <Select
            {...field}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            disabled={disabled}
            variant="underlined"
            color={"primary"}
            classNames={classNames}
            fullWidth
            size={"lg"}
            isInvalid={fieldState?.invalid}
            errorMessage={fieldState?.error?.message}
          >
            {options.map((option: Options) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            {...field}
            label={label}
            variant="underlined"
            color={"primary"}
            classNames={classNames}
            size={"lg"}
            disabled={disabled}
            isInvalid={fieldState?.invalid}
            errorMessage={fieldState?.error?.message}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => <>{renderInput(field, fieldState)}</>}
    />
  );
};

export default FormInput;
