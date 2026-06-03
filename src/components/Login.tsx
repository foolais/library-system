import { useLogin } from "../features/auth/auth.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../features/auth/auth.scema";

const Login = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <h2 className="text-text text-lg font-semibold">Sign In</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="username" className="label-input">
            USERNAME
          </label>
          <input
            id="username"
            placeholder="johndoe"
            {...register("username")}
            className="btn-input"
          />
          {errors.username && (
            <p className="error-input-message">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="label-input">
            PASSWORD
          </label>
          <input
            id="password"
            className="btn-input"
            type="password"
            placeholder="**********"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-input-message">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
