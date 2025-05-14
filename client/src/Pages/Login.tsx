import Button from "@/components/Button/Button";
import ShopForm from "@/components/Form/ShopForm";
import ShopInput from "@/components/Form/ShopInput";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import { useAppDispatch } from "@/Redux/hooks";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { setUser } from "@/Redux/features/auth/authSlice";
import { useRef } from "react";

const validationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Store method ref to control the form externally
  const formRef = useRef<any>(null);

  const handleSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(formData).unwrap();
      if (res.success) {
        localStorage.setItem("token", res.token);
        dispatch(
          setUser({
            user: {
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
            },
            token: res.token,
          })
        );
        toast.success(res.message || "Login successful!", { id: toastId });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });
    }
  };

  // Autofill credentials
  const fillDemo = (type: "admin" | "user") => {
    if (formRef.current) {
      const email =
        type === "admin"
          ? "azharmahmud730@gmail.com"
          : "azhar@gmail.com";
      formRef.current.setValue("email", email);
      formRef.current.setValue("password", "12345678");
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Login to Your Account</h2>
          <p className="text-sm text-gray-600 mt-1">Access your dashboard or shop</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => fillDemo("admin")}
            className="text-xs sm:text-sm px-3 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
          >
            Use Admin Credentials
          </button>
          <button
            onClick={() => fillDemo("user")}
            className="text-xs sm:text-sm px-3 py-2 rounded-md border border-green-500 text-green-600 hover:bg-green-50 transition"
          >
            Use User Credentials
          </button>
        </div>

        {/* Login Form */}
        <ShopForm
          className="space-y-4"
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          ref={formRef}
        >
          <ShopInput
            name="email"
            label="Email"
            type="email"
            placeHolder="Enter your email"
          />
          <ShopInput
            name="password"
            label="Password"
            type="password"
            placeHolder="Enter your password"
          />
          <Button type="submit" text="Login" isFullWidth={true} />
        </ShopForm>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <Link
            to="/register"
            className="text-primary font-medium hover:underline ms-1"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
