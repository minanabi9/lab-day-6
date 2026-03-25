import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema } from "@/lib/loginSchema";
import { Input } from "./ui/input";

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log("Validated Data:", data);
    login("fake-jwt-token-123");
    alert("Login successful! Token stored.");
    navigate("/cart");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="ahmed@iti.gov.eg" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" placeholder="********" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}