import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../validation/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
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

          {/* Server Error */}
          {loginMutation.isError && (
            <p className="text-sm text-red-600 text-center">
              Invalid email or password
            </p>
          )}

          {/* Submit */}
          <button
            disabled={loginMutation.isPending}
            className="bg-black text-white w-full py-2 rounded mt-2 disabled:opacity-50"
          >
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
