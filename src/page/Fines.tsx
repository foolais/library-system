import ButtonAddModal from "../components/modal/ButtonAddModal";
import Header from "../components/Header";
import FineModal from "../components/modal/FineModal";
import TableFines from "../components/table/TableFInes";

const FinesPage = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Fines</h2>
          <ButtonAddModal>
            <FineModal />
          </ButtonAddModal>
        </div>
        <TableFines />
      </div>
    </>
  );
};

export default FinesPage;
