import { cn } from "@/lib/utils";
import { Form } from "antd";
import { ReactNode, forwardRef, useImperativeHandle } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  className: string;
} & TFormConfig;

const ShopForm = forwardRef(
  ({ onSubmit, children, defaultValues, resolver, className }: TFormProps, ref) => {
    const formConfig: TFormConfig = {
      defaultValues,
      resolver,
    };
    const methods = useForm(formConfig);

    useImperativeHandle(ref, () => methods);

    const submit = (data: FieldValues) => {
      onSubmit(data);
      methods.reset();
    };

    return (
      <FormProvider {...methods}>
        <Form
          className={cn("", className)}
          layout="vertical"
          onFinish={methods.handleSubmit(submit)}
        >
          {children}
        </Form>
      </FormProvider>
    );
  }
);

export default ShopForm;
