import React from "react";
import { Plus } from "lucide-react";
import { useUIStore } from "../stores/ui.store";

interface ButtonAddModalProps {
  label?: string;
  children: React.ReactNode;
}

const ButtonAddModal = ({ label = "Add", children }: ButtonAddModalProps) => {
  const setModal = useUIStore((state) => state.setModal);

  const handleOpen = () => {
    setModal(true, null, "create");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="btn-primary flex w-40 cursor-pointer items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
      >
        <Plus className="size-4 stroke-[2.5]" />
        {label}
      </button>
      {children}
    </>
  );
};

export default ButtonAddModal;
