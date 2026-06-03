import { useMutation } from "@tanstack/react-query";
import { login } from "./auth.service";
import { useAuthStore } from "../../stores/auth.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: login,
    onSuccess(response) {
      const apiPayload = response.data;
      const user = apiPayload.data;

      loginStore({ username: user.username }, user.token);
      localStorage.setItem("accessToken", user.token);
      localStorage.setItem("refreshToken", user.refresh_token);

      toast.success(apiPayload.msg || "Logged in successfully!");
      navigate("/book");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      const serverErrorMessage = error?.response?.data?.msg;

      if (error?.response?.status === 401) {
        toast.error(
          serverErrorMessage || "Invalid credentials. Please try again.",
        );
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });
};
