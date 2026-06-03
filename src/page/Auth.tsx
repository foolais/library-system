import Login from "../components/Login";
import { BookOpenText, ShieldCheck } from "lucide-react";

const AuthPage = () => {
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="flex w-md max-w-md flex-col items-center gap-4">
        <div className="bg-primary rounded-sm p-1.5">
          <BookOpenText className="text-white" />
        </div>
        <div>
          <h1 className="text-primary text-3xl font-semibold">LibSystem</h1>
          <p className="text-text text-sm">Welcome to LibSystem</p>
        </div>
        <div className="border-border mt-4 w-full rounded-sm border bg-white p-6 text-left shadow-sm">
          <Login />
          <div className="border-border my-6 w-full border-t-2" />
          <div className="flex items-center justify-center">
            <ShieldCheck className="mr-1 inline" />
            <span className="text-text text-sm">
              Authentication with Google
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
