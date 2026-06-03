import AuthorModal from "../components/AuthorModal";
import ButtonAddModal from "../components/ButtonAddModal";
import CategoryModal from "../components/CategoryModal";
import Header from "../components/Header";
import TableAuthors from "../components/TableAuthor";
import TableBooks from "../components/TableBooks";
import TableCategory from "../components/TableCategory";
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
          {activeTab === "category" && (
            <ButtonAddModal>
              <CategoryModal />
            </ButtonAddModal>
          )}
          {activeTab === "author" && (
            <ButtonAddModal>
              <AuthorModal />
            </ButtonAddModal>
          )}
        </div>
        {activeTab === "all" && <TableBooks />}
        {activeTab === "category" && <TableCategory />}
        {activeTab === "author" && <TableAuthors />}
        {activeTab === "publisher" && <div>borrowed</div>}
      </div>
    </>
  );
};

export default BooksPage;
