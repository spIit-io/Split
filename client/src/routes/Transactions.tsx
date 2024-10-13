import { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { getTransactions } from "../services/Server/serverApi";
import { Transaction } from "../types/transaction_interface";  // Import the Transaction type

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = 'testuser1';  // Replace with actual user ID logic

  console.log(transactions)
  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(userId);
      setTransactions(data);
    };
    fetchTransactions();
  }, [userId]);

  return (
    <div className="text-2xl text-[#222] p-20">
      <div className="text-center mb-10">Transaction History</div>
      <ul className="flex flex-col gap-16">
        {transactions.map((transaction) => (
          <li key={transaction.TransactionID}>
            <TransactionItem
              date={transaction.PaymentDate}
              person={transaction.OutgoingUserID === userId ? transaction.IncomingUserID : transaction.OutgoingUserID}  // Display the other person involved
              amount={transaction.Amount}
              message={transaction.Description}
              resolved={false}  // Set this based on additional data if available
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;