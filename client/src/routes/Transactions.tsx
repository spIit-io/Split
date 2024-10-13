import { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { getTransactions } from "../services/Server/serverApi";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setTransactions(await getTransactions());
    };
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="text-2xl text-[#222] p-20">
        <div className="text-center mb-10">Transaction History</div>
        <ul className="flex flex-col gap-16">
          <li>
            <div>10-12-2024</div>
            <div className="flex flex-col mt-5 gap-5">
              <TransactionItem
                date="10/30/2024"
                person="Person"
                amount={100}
                message={"for chipotle order"}
              />
              <TransactionItem
                date="10/30/2024"
                person="Person"
                amount={100}
                resolved={true}
              />
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
            </div>
          </li>
          <li>
            <div>10-12-2024</div>
            <div className="flex flex-col mt-5 gap-5">
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
              <TransactionItem date="10/30/2024" person="Person" amount={100} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Transactions;
