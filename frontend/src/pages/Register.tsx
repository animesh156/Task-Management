import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../validation/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync(data);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-1">
          Create account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to start managing tasks
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name")}
              placeholder="Your name"
              className={`mt-1 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              className={`mt-1 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`mt-1 border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-black ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {registerMutation.isError && (
            <p className="text-sm text-red-600 text-center">
              Registration failed. Please try again.
            </p>
          )}

          {/* Submit */}
          <button
            disabled={registerMutation.isPending}
            className="bg-black text-white w-full py-2 rounded mt-2 disabled:opacity-50"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
