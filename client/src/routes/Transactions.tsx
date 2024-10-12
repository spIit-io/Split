import TransactionItem from "../components/TransactionItem";

function Transactions() {
  return (
    <>
      <div className="text-2xl text-[#222] p-20">
        <div className="text-center">Transactions</div>
        <div className="flex flex-col mt-10">
          <TransactionItem date="10/30/2024" sender="Person" amount={100} />
          <TransactionItem date="10/30/2024" sender="Person" amount={100} />
          <TransactionItem date="10/30/2024" sender="Person" amount={100} />
          <TransactionItem date="10/30/2024" sender="Person" amount={100} />
        </div>
      </div>
    </>
  );
}

export default Transactions;
