import Header from "../components/Header";
import TableBooks from "../components/TableBooks";
import TabsBook from "../components/TabsBook";
import { useUIStore } from "../stores/ui.store";

const BooksPage = () => {
  const activeTab = useUIStore((state) => state.bookTabs);
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="flex w-full items-center justify-between">
          <TabsBook />
        </div>
        {activeTab === "all" && <TableBooks />}
        {activeTab === "category" && <div>available</div>}
        {activeTab === "author" && <div>borrowed</div>}
        {activeTab === "publisher" && <div>borrowed</div>}
      </div>
    </>
  );
};

export default BooksPage;
