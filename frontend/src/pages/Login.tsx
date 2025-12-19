import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../validation/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#0f172a] border border-slate-800
                      p-6 rounded-xl shadow-lg">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-slate-100 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              className={`mt-1 h-10 w-full rounded-md bg-[#020617]
                          border px-3 text-sm text-slate-200 outline-none
                          focus:ring-2 focus:ring-slate-600
                          ${
                            errors.email
                              ? "border-red-500"
                              : "border-slate-700"
                          }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
             <div>
  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
    Password
  </label>

  <div className="relative mt-1">
    <input
      {...register("password")}
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className={`h-10 w-full rounded-md bg-[#020617]
                  border px-3 pr-10 text-sm text-slate-200 outline-none
                  focus:ring-2 focus:ring-slate-600
                  ${
                    errors.password
                      ? "border-red-500"
                      : "border-slate-700"
                  }`}
    />

    {/* Toggle icon */}
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute inset-y-0 right-3 flex items-center
                 text-slate-400 hover:text-slate-200 transition"
    >
      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  </div>

  {errors.password && (
    <p className="text-xs text-red-400 mt-1">
      {errors.password.message}
    </p>
  )}
</div>

          {/* Server Error */}
          {loginMutation.isError && (
            <p className="text-sm text-red-400 text-center">
              Invalid email or password
            </p>
          )}

          {/* Submit */}
          <button
            disabled={loginMutation.isPending}
            className="h-10 w-full rounded-md bg-slate-800
                       text-slate-100 text-sm font-medium
                       hover:bg-slate-700 transition
                       disabled:opacity-50"
          >
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-slate-400 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-slate-200 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
