import ButtonAddModal from "../components/ButtonAddModal";
import Header from "../components/Header";
import LoanModal from "../components/modal/LoanModal";
import TableLoan from "../components/table/TableLoan";

const LoansPage = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Loans</h2>
          <ButtonAddModal>
            <LoanModal />
          </ButtonAddModal>
        </div>
        <TableLoan />
      </div>
    </>
  );
};

export default LoansPage;
