import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../validation/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const { register, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync(data);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Register</h1>

        <input {...register("name")} placeholder="Name" className="border p-2 w-full" />
        <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
        <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full" />

        <button className="bg-black text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
