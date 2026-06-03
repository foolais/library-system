import { useState, useEffect } from "react"; // 🌟 Bring back useEffect safely
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useUIStore } from "../stores/ui.store";
import { useAuthStore } from "../stores/auth.store";

const SearchBar = () => {
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);
  const activeTab = useUIStore((state) => state.bookTabs);
  const user = useAuthStore((state) => state.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [localInput, setLocalInput] = useState(urlQuery);

  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, []);

  if (!user) return null;

  const handleSearchTrigger = () => {
    setSearchQuery(localInput);

    if (localInput.trim()) {
      setSearchParams({ q: localInput });
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };

  const handleClear = () => {
    setLocalInput("");
    setSearchQuery("");

    searchParams.delete("q");
    setSearchParams(searchParams);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchTrigger();
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case "category":
        return "Cari jenis buku...";
      case "author":
        return "Cari nama penulis...";
      case "publisher":
        return "Cari nama penerbit...";
      default:
        return "Cari judul buku atau isbn...";
    }
  };

  if (activeTab === "all") {
    return null;
  }

  return (
    <div className="mt-4 flex w-full max-w-xl items-center gap-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Search className="size-4" />
        </div>
        <input
          type="text"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 bg-white py-2 pr-10 pl-9 text-sm text-gray-900 shadow-sm focus:ring-1 focus:outline-none"
        />
        {localInput && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleSearchTrigger}
        className="btn-primary flex shrink-0 items-center justify-center gap-1.5 px-4 py-2 text-sm shadow-sm"
      >
        <span>Cari</span>
        <Search className="size-4" />
      </button>
    </div>
  );
};

export default SearchBar;
