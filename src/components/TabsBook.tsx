import type { BookTabs } from "../features/book/book.types";
import { TabsBookData } from "../lib/data";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/auth.store";
import { useUIStore } from "../stores/ui.store";

const TabsBook = () => {
  const activeTab = useUIStore((state) => state.bookTabs);
  const setBookTabs = useUIStore((state) => state.setBookTabs);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex gap-1">
      {TabsBookData.map((tab) => (
        <div
          key={tab.value}
          className={cn(
            "hover:bg-primary cursor-pointer rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-white",
            activeTab === tab.value ? "bg-primary text-white" : "bg-gray-200",
            user ? "" : "hidden",
          )}
          onClick={() => setBookTabs(tab.value as BookTabs)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

export default TabsBook;
