import { NavLink } from "react-router-dom";
import { LinkData } from "../lib/data";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "../stores/auth.store";
import { useLogout } from "../features/auth/auth.hook";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useLogout();

  return (
    <div className="border-border h-16 w-full border-b bg-white shadow-md">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center justify-center gap-6 md:gap-12">
          <h1 className="text-primary text-lg font-semibold md:text-2xl">
            LibSystem
          </h1>
          <nav className="flex h-16 items-center gap-4 md:gap-8">
            {LinkData.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex h-16 items-center justify-center text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary border-b-primary border-b-3 font-bold"
                      : "text-secondary hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-1">
              <User className="text-white" />
            </div>
            <span className="hidden text-sm font-semibold md:block">
              {user?.username}
            </span>
          </div>
          <button className="btn-destructive p-1" onClick={handleLogout}>
            <span className="sr-only">Logout</span>
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
