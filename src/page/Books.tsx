import AuthorModal from "../components/modal/AuthorModal";
import ButtonAddModal from "../components/modal/ButtonAddModal";
import CategoryModal from "../components/modal/CategoryModal";
import Header from "../components/Header";
import PublisherModal from "../components/modal/PublisherModal";
import SearchBar from "../components/SearchBar";
import TableAuthors from "../components/table/TableAuthor";
import TableBooks from "../components/table/TableBooks";
import TableCategory from "../components/table/TableCategory";
import TablePublishers from "../components/table/TablePublisher";
import TabsBook from "../components/TabsBook";
import { useUIStore } from "../stores/ui.store";

const BooksPage = () => {
  const activeTab = useUIStore((state) => state.bookTabs);

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
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
          {activeTab === "publisher" && (
            <ButtonAddModal>
              <PublisherModal />
            </ButtonAddModal>
          )}
        </div>
        <SearchBar key={activeTab} />
        {activeTab === "all" && <TableBooks />}
        {activeTab === "category" && <TableCategory />}
        {activeTab === "author" && <TableAuthors />}
        {activeTab === "publisher" && <TablePublishers />}
      </div>
    </>
  );
};

export default BooksPage;
