import { cn } from "@/lib/utils";
import { Checkbox, Form } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";


const ShopCheckbox = ({
  name,
  label,
  labelClassName,
  checkboxClassName,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  value?: boolean;
  onValueChange?: (newValue: boolean) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the checkbox value
  const checkboxValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(checkboxValue); // Trigger the callback whenever the value changes
    }
  }, [checkboxValue, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: false, // Adjust validation as needed
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            <Form.Item style={{ marginBottom: "0px" }}>
              <Checkbox
                {...field}
                id={name}
                checked={field.value}
                className={cn("text-primary dark:text-white", checkboxClassName)}
              >
                <span className={cn("text-base font-normal leading-6 text-gray-800", labelClassName)}>
                  {label}
                </span>
              </Checkbox>
            </Form.Item>
            {error && <small className="text-primary">{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default ShopCheckbox;
