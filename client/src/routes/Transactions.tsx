import { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { getTransactions } from "../services/Server/serverApi";
import { Transaction } from "../types/interfaces";  // Import the Transaction type

// Helper function to group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  return transactions.reduce((groups: { [key: string]: Transaction[] }, transaction) => {
    const date = new Date(transaction.PaymentDate).toLocaleDateString();  // Extract date part as string
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = 'testuser1';  // Replace with actual user ID logic

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions(userId);

      // Sort transactions by PaymentDate in descending order
      const sortedTransactions = data.sort((a, b) => {
        return new Date(b.PaymentDate).getTime() - new Date(a.PaymentDate).getTime();
      });

      setTransactions(sortedTransactions);
    };
    fetchTransactions();
  }, [userId]);

  // Group transactions by date
  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="text-2xl text-[#222] p-20">
      <div className="text-center mb-10">Transaction History</div>
      <ul className="flex flex-col gap-5 mb-10">
        {/* Loop through grouped transactions */}
        {Object.entries(groupedTransactions).map(([date, transactionsForDate]) => (
          <li key={date}>
            {/* Display the date at the top of each group */}
            <div className="text-lg font-bold mb-3">{date}</div>
            <ul className="flex flex-col gap-3">
              {transactionsForDate.map((transaction) => (
                <li key={transaction.TransactionID}>
                  <TransactionItem
                    date={transaction.PaymentDate}
                    person={transaction.OutgoingUserID === userId ? transaction.IncomingUserID : transaction.OutgoingUserID}
                    amount={transaction.Amount/100}
                    message={transaction.Description}
                    resolved={false}  // Set this based on additional data if available
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;